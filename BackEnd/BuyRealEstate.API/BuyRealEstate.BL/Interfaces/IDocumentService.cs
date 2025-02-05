using BuyRealEstate.Core.DTos;
using BuyRealEstate.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace BuyRealEstate.Core.Interfaces
{
    public interface IDocumentService
    {
        Task<IEnumerable<DocumentDTO>> GetAllDocumentsAsync();
        Task<IEnumerable<DocumentDTO>> GetAllDocumentsByProjectIdAsync(int id,bool isrecipe);
        Task<string> GetDocumentBase64ByIdAsync(int id);
        Task<DocumentDTO> GetDocumentByIdAsync(int id);
        Task AddDocumentAsync(DocumentDTO plot);
        Task UpdateDocumentAsync(DocumentDTO plot);
        Task DeleteDocumentAsync(int id);
    }
}