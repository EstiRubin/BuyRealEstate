using BuyRealEstate.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuyRealEstate.Core.DTos
{
    public class DocumentDTO
    {
        public int ID { get; set; }
        public int? ProjectID { get; set; }
        //public int? PamentID { get; set; }
        //public int? UserId { get; set; }
        public byte[] DocumentData { get; set; }
        public string DocumentDescription { get; set; }
        public bool IsRecipt { get; set; }
       // public Project? Project { get; set; }
       //  public Payment? Payment { get; set; }
       //public Users User { get; set; }
    }
}
