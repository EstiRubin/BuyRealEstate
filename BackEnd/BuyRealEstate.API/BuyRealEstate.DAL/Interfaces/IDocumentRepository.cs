using BuyRealEstate.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace BuyRealEstate.Domain.Interfaces
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetAllDocumentsAsync();
        Task<string> GetDocumentBase64ByIdAsync(int id);
        Task<IEnumerable<Document>> GetAllDocumentsByProjectAsync(int id, bool isRecipe);
        Task<Document> GetDocumentByIdAsync(int id);
        Task AddDocumentAsync(Document project);
        Task UpdateDocumentAsync(Document project);
        Task DeleteDocumentAsync(int id);
    }
}