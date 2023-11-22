using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AI2_Backend.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]    
        public enum Voivodeship
        {
            dolnośląskie,
            kujawskoPomorskie,
            lubelskie,
            lubuskie,
            łódzkie,
            małopolskie,
            mazowieckie,
            opolskie,
            podkarpackie,
            podlaskie,
            pomorskie,
            śląskie,
            świętokrzyskie,
            warmińskoMazurskie,
            wielkopolskie,
            zachodnioPomorskie
    }
}
