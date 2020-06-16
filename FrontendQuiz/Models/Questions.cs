using System;
using System.Collections.Generic;

namespace FrontendQuiz.Models
{
    public partial class Questions
    {
        public Questions()
        {
            Choices = new HashSet<Choices>();
        }

        public int QuestionId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Choices> Choices { get; set; }
    }
}
