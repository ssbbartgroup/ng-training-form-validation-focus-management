import { Component, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-validation',
  templateUrl: './app.form.html'
})

export class FormValidationComponent {
  complexForm: FormGroup;
  showMessage: boolean;
  submitted: boolean;
  hasError: boolean;
  titleService: Title;
  originalPageTitle: String;
  @ViewChild('errorHeading') errorHeading:ElementRef;
  @ViewChild('messageHeading') messageHeading:ElementRef;
  @ViewChild('errorList') errorList:ElementRef;
  

  constructor(fb: FormBuilder, titleService: Title) {
    this.showMessage = false;
    this.submitted = false;
   

    // Set title service to global so we can use it class
    this.titleService = titleService;
    // Get the original page title so we can use it to update later
    this.originalPageTitle = this.titleService.getTitle();

    this.complexForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phoneNumber': [null, Validators.compose([
        Validators.required,
        Validators.pattern(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g),
        Validators.minLength(7)
      ])],
      'message': [null, Validators.required]
    });
  }

  submitForm(value: any) {
    this.submitted = true;

    if (this.complexForm.valid) {
      
      this.showMessage = true;
      this.hasError = false;

      // Update page title to indicate the form was submitted
      this.titleService.setTitle('Submitted - ' + this.originalPageTitle);
      
      //Focus the success message
      setTimeout(() => {
        this.messageHeading.nativeElement.focus();
      }, 0);

    } else {

      //Set the error state to true to use in class bindings
      this.hasError = true;
      
      //Focus the error state heading
      setTimeout(() => {
			  this.errorHeading.nativeElement.focus();
      }, 0);

      // Update page title to indicate there are errors on the page
      this.titleService.setTitle('Error - ' + this.originalPageTitle );
    }
  }


}
