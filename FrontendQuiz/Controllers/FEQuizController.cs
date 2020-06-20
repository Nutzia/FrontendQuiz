using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FrontendQuiz.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrontendQuiz.Controllers
{
    public class FEQuizController : Controller
    {
        private readonly FrontendQuizContext feq;
        private FrontendQuizContext _feq;

        public FEQuizController (FrontendQuizContext feq)
        {
            _feq = feq;
        }
        public IActionResult Index()
        {
            var questions = _feq.Questions.ToList();
            var choices = _feq.Choices.ToList();

            return View(questions);
        }
    }
}
