import { Component, OnInit } from '@angular/core';
import { QuizService } from './shared/quiz.service';
import { HttpRequest } from '@angular/common/http';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  totalQuestions: any;
  myQuestions: any;
  score = 0;
  activeQuestions = -1;
  activeQuestionsAnswered = 0;
  percentage;
  url;
  twitterLink;
  emailLink;
  newMarkup;
  constructor(private _quizService: QuizService) {}
  ngOnInit() {
    this._quizService.getJSON().subscribe(data => {
      console.log(data);
      this.myQuestions = data;
      this.totalQuestions =  this.myQuestions.length;
    });
  }
  selectAnswer(qIndex, aIndex) {
    const questionState = this.myQuestions[qIndex].questionState;
    if (questionState !== 'answered') {
      this.myQuestions[qIndex].selectedAnswer = aIndex;
      const correctAnswer = this.myQuestions[qIndex].correct;
      this.myQuestions[qIndex].correctAnswer = correctAnswer;

      if (aIndex === correctAnswer) {
        this.myQuestions[qIndex].correctness = 'correct';
        this.score += 1;
      } else {
        this.myQuestions[qIndex].correctness = 'incorrect';
      }
      this.myQuestions[qIndex].questionState = 'answered';
    }
     this.percentage = ((this.score / this.totalQuestions) * 100).toFixed(2);
  }
  isSelected(qIndex, aIndex) {
    return this.myQuestions[qIndex].selectedAnswer === aIndex;
  }
  isCorrect(qIndex, aIndex) {
    return this.myQuestions[qIndex].correctAnswer === aIndex;
  }
  selectContinue() {
    return this.activeQuestions += 1;
  }
/* selectShareLink(percentage) {
    console.log(this.percentage);
    this.url = 'https://mail.google.com/mail/u/0/#inbox?compose=new';
    this.emailLink = `<a class="btn email" href="mailto:?subject=Quiz!&amp;body='+percentage +
    '% on quiz url '+this.url+'">Email to friend</a>`;

   this.twitterLink = `<a class="btn twitter" target="_blank" href="https://twitter.com/share?text='+percentage+'
   % score.Url= &amp;hashtags=Quiz&amp;url='+this.url+'">Tweet your score</a>`;
   this.newMarkup = this.emailLink + this.twitterLink;
    return  this.newMarkup;
  }
 selectShareLink(percentage) {
  console.log(this.percentage);
  this.url= 'https://mail.google.com/mail/u/0/#inbox?compose=new';
  this.emailLink = `<a class="btn email" href="mailto:?subject=Quiz!&amp;body='+percentage +
  '% on quiz url '+this.url+'"></a>`;
  return  this.newMarkup;
} */
}
