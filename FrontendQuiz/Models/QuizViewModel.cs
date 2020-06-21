using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FrontendQuiz.Models
{
    public class QuizViewModel
    {
        [Key]
        public int QuestionID { get; set; }
        public string Description { get; set; }
        [ForeignKey ("QuestionId")]
        public ICollection<Choices> Choices { get; set; }
    }
}
