using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using greenhome.Models;

namespace greenhome.Controllers
{
    public class PlantsController : Controller
    {
        private readonly AppDbContext _context;

        public PlantsController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // CATALOG
        // =========================

        public async Task<IActionResult> Index(
            string size,
            string watering,
            string light)
        {
            var plants = _context.Plants
                .Include(p => p.Category)
                .AsQueryable();

            // SIZE
            if (!string.IsNullOrEmpty(size))
            {
                plants = plants.Where(p => p.Size == size);
            }

            // WATERING
            if (!string.IsNullOrEmpty(watering))
            {
                plants = plants.Where(p => p.Watering == watering);
            }

            // LIGHT
            if (!string.IsNullOrEmpty(light))
            {
                plants = plants.Where(p => p.Light == light);
            }

            return View(await plants.ToListAsync());
        }

        // =========================
        // AJAX FILTER
        // =========================

        [HttpGet]
        public async Task<IActionResult> Filter(
                    string size,
                    string watering,
                    string light)
        {
            var plants = _context.Plants.AsQueryable();

            if (!string.IsNullOrEmpty(size))
            {
                plants = plants.Where(p => p.Size == size);
            }

            if (!string.IsNullOrEmpty(watering))
            {
                plants = plants.Where(p => p.Watering == watering);
            }

            if (!string.IsNullOrEmpty(light))
            {
                plants = plants.Where(p => p.Light == light);
            }

            return Json(await plants.ToListAsync());
        }

        // =========================
        // CATEGORY PAGE
        // =========================

        public async Task<IActionResult> Category(
            string id,
            string size,
            string watering,
            string light)
        {
            // CATEGORY
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Slug == id);

            if (category == null)
            {
                return NotFound();
            }

            // PLANTS
            var plants = _context.Plants
                .Include(p => p.Category)
                .Where(p => p.CategoryId == category.Id)
                .AsQueryable();

            // SIZE
            if (!string.IsNullOrEmpty(size))
            {
                plants = plants.Where(p => p.Size == size);
            }

            // WATERING
            if (!string.IsNullOrEmpty(watering))
            {
                plants = plants.Where(p => p.Watering == watering);
            }

            // LIGHT
            if (!string.IsNullOrEmpty(light))
            {
                plants = plants.Where(p => p.Light == light);
            }

            ViewBag.CategoryName = category.Name;
            ViewBag.CategoryDescription = category.Description;

            return View(await plants.ToListAsync());
        }

        // =========================
        // DETAILS
        // =========================

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants
                .Include(p => p.Category)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (plant == null)
            {
                return NotFound();
            }

            return View(plant);
        }

        // =========================
        // CREATE
        // =========================

        public IActionResult Create()
        {
            ViewBag.Categories = _context.Categories.ToList();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Plant plant)
        {
            plant.Temperature += " °C";

            plant.Slug = plant.LatinName
                .ToLower()
                .Replace(" ", "-");

            ModelState.Remove("Slug");
            ModelState.Remove("Category");

            if (ModelState.IsValid)
            {
                _context.Plants.Add(plant);

                await _context.SaveChangesAsync();

                TempData["Success"] =
                    "Растение успешно добавлено!";

                return RedirectToAction(nameof(Create));
            }

            ViewBag.Categories =
                _context.Categories.ToList();

            return View(plant);
        }

        // =========================
        // EDIT
        // =========================

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants.FindAsync(id);

            if (plant == null)
            {
                return NotFound();
            }

            return View(plant);
        }


        // =========================
        // DELETE
        // =========================

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants
                .Include(p => p.Category)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (plant == null)
            {
                return NotFound();
            }

            return View(plant);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            var plant = await _context.Plants.FindAsync(id);

            if (plant != null)
            {
                _context.Plants.Remove(plant);
            }

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        // =========================
        // EXISTS
        // =========================

        private bool PlantExists(int? id)
        {
            return _context.Plants.Any(e => e.Id == id);
        }
    }
}