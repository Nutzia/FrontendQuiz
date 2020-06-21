using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrontendQuiz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrontendQuiz.Controllers
{
    public class QuizController : Controller
    {
        private readonly FrontendQuizContext _context;

        public QuizController(FrontendQuizContext context)
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

        public IActionResult Answers_JSON(string answers)
        {
            int[] answersArray = answers.Split(',').Select(int.Parse).ToArray();
            int answerLength = answersArray.Length;
            int correctAnswers = 0;

            foreach (var choice in _context.Choices)
            {
                if (answersArray.Contains(choice.ChoiceId))
                {
                    if (choice.IsCorrect == 1)
                    {
                        correctAnswers++;
                    }
                }
            }

            return Json((correctAnswers * 100) / answerLength);
        }
    }
}
