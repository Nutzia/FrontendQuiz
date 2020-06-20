using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrontendQuiz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrontendQuiz.Controllers
{
    public class Quiz1Controller : Controller
    {
        private readonly FrontendQuizContext _context;

        public Quiz1Controller(FrontendQuizContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Questions_JSON()
        {
            IEnumerable<QuizViewModel> model =
                from q in _context.Questions
                select new QuizViewModel()
                {
                    QuestionID = q.QuestionId,
                    Description = q.Description,
                    Choices = q.Choices,
                };

            return Json(model.ToArray());
        }
        //{
            //IEnumerable<CustomerViewModel> model =
            //    from c in _context.Customer
            //        .Include(c => c.Person)
            //    where c.Person.FirstName.ToLower().Contains(keyword)
            //        ||
            //        c.Person.LastName.ToLower().Contains(keyword)
            //    orderby c.Person.LastName
            //    select new CustomerViewModel()
            //    {
            //        Id = c.CustomerId,
            //        AccountNumber = c.AccountNumber,
            //        FirstName = c.Person.FirstName,
            //        LastName = c.Person.LastName
            //    };

            // var choices = await _context.Choices.ToListAsync();

            //return Json();
        //}
    }
}
