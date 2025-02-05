using AutoMapper;
using BuyRealEstate.Core.DTos;
using BuyRealEstate.Core.Interfaces;
using BuyRealEstate.Domain.Interfaces;
using BuyRealEstate.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace BuyRealEstate.Core.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IMapper _mapper;
        public DocumentService(IDocumentRepository documentRepository, IMapper mapper)
        {
            _documentRepository = documentRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DocumentDTO>> GetAllDocumentsAsync()
        {
            var documents = await _documentRepository.GetAllDocumentsAsync();
            return documents.Select(p => _mapper.Map<DocumentDTO>(p));
        }
        public async Task<IEnumerable<DocumentDTO>> GetAllDocumentsByProjectIdAsync(int id, bool isRecipe)
        {
            var documents = await _documentRepository.GetAllDocumentsByProjectAsync(id, isRecipe);
            return documents.Select(d => _mapper.Map<DocumentDTO>(d));
        }



        public async Task<DocumentDTO> GetDocumentByIdAsync(int id)
        {
            var document = await _documentRepository.GetDocumentByIdAsync(id);
            if (document == null) return null;
            return _mapper.Map<DocumentDTO>(document);
        }
        public async Task<string> GetDocumentBase64ByIdAsync(int id)
        {
            return await _documentRepository.GetDocumentBase64ByIdAsync(id);
        }
        public async Task AddDocumentAsync(DocumentDTO documentDTO)
        {
            var document = _mapper.Map<Document>(documentDTO);
            await _documentRepository.AddDocumentAsync(document);
        }
        public async Task UpdateDocumentAsync(DocumentDTO documentDTO)
        {
            var document = _mapper.Map<Document>(documentDTO);
            await _documentRepository.UpdateDocumentAsync(document);
        }
        public async Task DeleteDocumentAsync(int id)
        {
            await _documentRepository.DeleteDocumentAsync(id);
        }
    }
}