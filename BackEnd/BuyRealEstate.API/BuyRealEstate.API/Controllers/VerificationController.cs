using BuyRealEstate.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using System.Security.Claims;
using BuyRealEstate.Core.DTos;

[Route("api/[controller]")]
[ApiController]
public class VerificationController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly IUserService _userervice;

    public VerificationController(IEmailService emailService, IUserService userService)
    {
        _emailService = emailService;
        _userervice = userService;
    }
    private static Dictionary<string, string> verificationCodes = new Dictionary<string, string>();

    [HttpPost("SendVerificationCode")]
    public async Task<IActionResult> SendVerificationCode([FromBody] VerificationRequest verificationRequest)
    {
        if (verificationRequest == null || string.IsNullOrEmpty(verificationRequest.Username) || string.IsNullOrEmpty(verificationRequest.Password))
        {
            return BadRequest("Username and password are required.");
        }

        var user = await _userervice.GetUserAsync(verificationRequest.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(verificationRequest.Password, user.Password))
        {
            return Unauthorized("Invalid username or password");
        }
        //להעביר לCOMMON
        var verificationCode = new Random().Next(100000, 999999).ToString();

        // **שומר את הקוד במילון כדי להשתמש בו באימות**
        verificationCodes[verificationRequest.Username] = verificationCode;

        var message = $@"
    <h3>קוד אימות לאפליקצית לקנות נדלן</h3>
    <p>קוד האימות שלך הוא: <strong>{verificationCode}</strong></p>
    <p>אנא אמת את קוד האימות</p>";

        await _emailService.SendEmailAsync(user.Email, "קוד אימות", message);

        return Ok(new { message = "Verification code sent successfully.", userId =user.ID });
    }

    [HttpPost("VerifyCode")]
    public IActionResult VerifyCode([FromBody] VerifyCodeRequest verifyRequest)
    {
        if (verifyRequest == null || string.IsNullOrEmpty(verifyRequest.Username) || string.IsNullOrEmpty(verifyRequest.Code))
        {
            return BadRequest("Username and code are required.");
        }

        // **בודק האם המשתמש קיים במילון ואם הקוד תואם**
        if (verificationCodes.TryGetValue(verifyRequest.Username, out var correctCode))
        {
            if (correctCode == verifyRequest.Code)
            {
                verificationCodes.Remove(verifyRequest.Username); // **מוחק את הקוד אחרי השימוש**
                return Ok(new { message = "Verification successful." });
            }
            else
            {
                return Unauthorized("Invalid verification code.");
            }
        }

        return Unauthorized("No verification code found for this user.");
    }



}

