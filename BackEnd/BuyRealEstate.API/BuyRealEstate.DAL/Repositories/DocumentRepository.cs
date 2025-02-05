using BuyRealEstate.Domain.Interfaces;
using BuyRealEstate.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace BuyRealEstate.Domain.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly AppDbContext _context;
        public DocumentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Document>> GetAllDocumentsAsync()
        {
            return await _context.Documents.ToListAsync();
        }
        public async Task<IEnumerable<Document>> GetAllDocumentsByProjectAsync(int id, bool isRecipe)
        {
            return await _context.Documents.Where(p => p.ProjectID == id && p.IsRecipt == isRecipe).ToListAsync();
        }



        public async Task<Document> GetDocumentByIdAsync(int id)
        {
            return await _context.Documents.FirstOrDefaultAsync(p => p.ID == id);
        }
        public async Task<string> GetDocumentBase64ByIdAsync(int id)
        {
            var document = await _context.Documents.FirstOrDefaultAsync(p => p.ID == id);
            if (document == null) return null;
            // המרת הנתונים ל-Base64
            var base64Data = Convert.ToBase64String(document.DocumentData);
            return $"data:application/pdf;base64,{base64Data}";
        }
        public async Task AddDocumentAsync(Document document)
        {
            await _context.Documents.AddAsync(document);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateDocumentAsync(Document document)
        {
            _context.Documents.Update(document);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteDocumentAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document != null)
            {
                _context.Documents.Remove(document);
                await _context.SaveChangesAsync();
            }
        }
    }
}