using System;
using System.Collections.Generic;

namespace FrontendQuiz.Models
{
    public partial class Choices
    {
        public int ChoiceId { get; set; }
        public string Description { get; set; }
        public int IsCorrect { get; set; }
        public int QuestionId { get; set; }

        public virtual Questions Question { get; set; }
    }
}
