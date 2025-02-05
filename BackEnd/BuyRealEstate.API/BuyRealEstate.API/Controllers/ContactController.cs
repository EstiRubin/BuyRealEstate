using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;

    public ContactController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendContactEmail([FromBody] ContactRequest contactRequest)
    {
        if (contactRequest == null || string.IsNullOrEmpty(contactRequest.subject) || string.IsNullOrEmpty(contactRequest.recipientEmail) || string.IsNullOrEmpty(contactRequest.message))
        {
            return BadRequest("All fields are required.");
        }

        var message = $@"<p><strong></strong><br>{contactRequest.message}</p>";
        await _emailService.SendEmailAsync("liknotnadlan@gmail.com", "הודעה חדשה מאתר ניהול לקוחות - צור קשר", message);
        return Ok();
    }
}

public class ContactRequest
{
    public string subject { get; set; }
    public string recipientEmail { get; set; }
    public string message { get; set; }
}
