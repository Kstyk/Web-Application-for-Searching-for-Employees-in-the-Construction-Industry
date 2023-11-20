﻿namespace AI2_Backend.Entities
{
    public class Stats
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual User? Employee { get; set; }
        public int CounterDaily { get; set; }
        public int CounterMonthly { get; set; }
    }
}