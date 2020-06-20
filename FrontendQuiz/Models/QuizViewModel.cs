using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontendQuiz.Models
{
    public class QuizViewModel
    {
        public int QuestionID { get; set; }
        public string Description { get; set; }
        public ICollection<Choices> Choices { get; set; }
    }
}
