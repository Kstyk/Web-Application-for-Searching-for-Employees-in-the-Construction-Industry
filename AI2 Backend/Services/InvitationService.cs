using AI2_Backend.Settings;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using AI2_Backend.Entities;
using AI2_Backend.Models;
using AutoMapper;
using AI2_Backend.Enums;

namespace AI2_Backend.Services
{
    public class InvitationService : IInvitationSevice
    {
        private readonly SmtpSettings _smtpSettings;
        private readonly IUserContextService _userContextService;
        private readonly AIDbContext _dbContext;
        private readonly IMapper _mapper;

        public InvitationService(IOptions<SmtpSettings> smtpSettings, IUserContextService userContextService, AIDbContext context, IMapper mapper)
        {
            _smtpSettings = smtpSettings.Value;
            _userContextService = userContextService;
            _dbContext = context;
            _mapper = mapper;
        }

        public void SendMail(InvitationRequestDto inv)
        {
            
            var email = new MimeMessage();
            var userId = _userContextService.GetUserId;
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId) ?? throw new Exception("Nie znaleziono użytkownika");

            email.From.Add(MailboxAddress.Parse(user.Email));
            email.To.Add(MailboxAddress.Parse(inv.ToEmail));

            email.Subject = inv.Company + ' ' + inv.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = inv.Body };

            var invitation = _mapper.Map<InvitationHistory>(inv);

            invitation.DateOfSending = DateTime.Now;
            invitation.RecruiterId = userId ?? throw new Exception();
            invitation.EmployeeId = _dbContext.Users.FirstOrDefault(u => u.Email == inv.ToEmail)?.Id ?? throw new Exception("Nie znaleziono odbiorcy");
            invitation.Title = $"{inv.Company} - {inv.Subject}";
            invitation.Status = InvitationStatus.NEW;

            _dbContext.InvitationHistories.Add(invitation);
            _dbContext.SaveChanges();

            using var smtpClient = new SmtpClient();
            smtpClient.Connect(_smtpSettings.Server, _smtpSettings.Port, SecureSocketOptions.StartTls);
            smtpClient.Authenticate(_smtpSettings.Username, _smtpSettings.Password);
            smtpClient.Send(email);
            smtpClient.Disconnect(true);

        }
        public List<InvitationDto> GetInvitations(int recruiterId)
        {
            var invitations = _dbContext.InvitationHistories
                  .Include(i => i.Recruiter)
                  .Include(i => i.Employee)
                  .Where(i => i.RecruiterId == recruiterId)
                  .ToList();

            var invitationsDto = _mapper.Map<List<InvitationDto>>(invitations);
            return invitationsDto;
        }

        public bool Update(int invitationId, UpdateInvitationStatusDto dto)
        {
            var invitation = _dbContext.InvitationHistories
                    .FirstOrDefault(i => i.Id == invitationId);
           
            if (invitation is null)
            {
                return false;
            }


            invitation.Status = dto.Status;
            _dbContext.SaveChanges();

            return true;
        }
    }
}
