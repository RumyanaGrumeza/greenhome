using Microsoft.AspNetCore.Mvc;

namespace greenhome.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}