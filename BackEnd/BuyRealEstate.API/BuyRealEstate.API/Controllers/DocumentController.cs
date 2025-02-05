using BuyRealEstate.Core.Interfaces;
using BuyRealEstate.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BuyRealEstate.Core.DTos;
namespace BuyRealEstate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDocuments()
        {
            var documents = await _documentService.GetAllDocumentsAsync();
            var response = documents.Select(d => new
            {
                ID = d.ID,
                DocumentDescription = d.DocumentDescription,
                DocumentData = d.DocumentData != null ? Convert.ToBase64String(d.DocumentData) : null
            });
            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentsByProjectID(int id, [FromQuery] bool isRecipe)
        {
            try
            {
                var documents = await _documentService.GetAllDocumentsByProjectIdAsync(id, isRecipe);
                if (documents == null || !documents.Any())
                {
                    return NotFound($"No documents found for Project ID: {id} (isRecipe: {isRecipe})");
                }

                return Ok(documents);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching documents: {ex.Message}");
                return StatusCode(500, "Internal Server Error: Unable to retrieve documents.");
            }
        }


        public async Task<IActionResult> GetDocument(int id)
        {
            var base64Data = await _documentService.GetDocumentBase64ByIdAsync(id);
            if (base64Data == null)
            {
                return NotFound();
            }
            return Ok(new { pdfData = base64Data });
        }
        [HttpPost]
        public async Task<IActionResult> AddDocument([FromBody] DocumentDTO document)
        {
            await _documentService.AddDocumentAsync(document);
            return CreatedAtAction(nameof(GetDocument), new { id = document.ID }, document);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDocument(int id, [FromBody] DocumentDTO document)
        {
            if (id != document.ID)
            {
                return BadRequest();
            }
            await _documentService.UpdateDocumentAsync(document);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            await _documentService.DeleteDocumentAsync(id);
            return NoContent();
        }
    }
}