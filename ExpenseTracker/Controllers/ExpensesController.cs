using System.Linq;
using ExpensesData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpensesContext _db;

        public ExpensesController(ExpensesContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _db.Expense.ToListAsync();

            return Ok(result);
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetAsync(int id)
        {
            var result = await _db.Expense.FindAsync(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Expense item)
        {
            if (item.ExpenseId != 0)
                return BadRequest();

            _db.Expense.Add(item);

            await _db.SaveChangesAsync();

            return CreatedAtAction("Post", new { id = item.ExpenseId }, item);
        }

        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] Expense item)
        {
            if (!_db.Expense.Any(e => e.ExpenseId == item.ExpenseId))
                return NotFound();

            _db.Expense.Update(item);

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var expense = await _db.Expense.FindAsync(id);

            if (expense == null)
                return NotFound();

            _db.Expense.Remove(expense);

            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
