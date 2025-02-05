using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuyRealEstate.Domain.Models
{
    public class Document:BaseClass
    {
        public int ID { get; set; }
        public int? ProjectID { get; set; }
        public int? PamentID { get; set; }
        public int? UserId { get; set; }
        public byte[] DocumentData { get; set; }
        public string DocumentDescription { get; set; }
        public Project? Project { get; set; }
        public Payment? Payment { get; set; }
        public User? User { get; set; }
        public string FileType { get; set; }
        public bool IsRecipt { get; set; }
        
    }
}
