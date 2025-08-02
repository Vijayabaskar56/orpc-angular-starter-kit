import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TanStackField } from '@tanstack/angular-form';
import { SignUpSchema, signUpSchema } from '../../../models/validation.model';
import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';

@Component({
 selector: 'app-signup',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterLink, TanStackField],
 template: `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md animate-fade-in">
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-1">Create Account</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Join us! Create your account to get started.</p>

          <form (ngSubmit)="form.handleSubmit()" class="space-y-4">
          <ng-container [tanstackField]="form" name="name" #name="field">
            <div>
              <label [for]="name.api.name">
                Name
              </label>
              <input
                type="text"
                [name]="name.api.name"
                [id]="name.api.name"
                [value]="name.api.state.value"
                (input)="name.api.handleChange($any($event).target.value)"
                class="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
                placeholder="Enter your name"
                required
              />
              @if (name.api.state.meta.isDirty && name.api.state.meta.errors) {
               @for (error of name.api.state.meta.errors; track $index) {
                <span class="label-text-alt text-red-600">{{ error.message }}</span>
               }
              }
            </div>
          </ng-container>
            <ng-container [tanstackField]="form" name="email" #email="field">
              <div>
                <label [for]="email.api.name">
                  Email
                </label>
                <input
                type="email"
                [name]="email.api.name"
                [id]="email.api.name"
                [value]="email.api.state.value"
                (input)="email.api.handleChange($any($event).target.value)"
                class="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
                placeholder="Enter your email"
                required
              />
              @if (email.api.state.meta.isDirty && email.api.state.meta.errors) {
               @for (error of email.api.state.meta.errors; track $index) {
                <span class="label-text-alt text-red-600">{{ error.message }}</span>
               }
              }
            </div>
          </ng-container>
            <ng-container [tanstackField]="form" name="password" #password="field">
              <div>
                <label [for]="password.api.name">
                Password
              </label>
              <input
                type="password"
                [name]="password.api.name"
                [id]="password.api.name"
                [value]="password.api.state.value"
                (input)="password.api.handleChange($any($event).target.value)"
                class="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
                placeholder="Choose a password"
                required
              />
              @if (password.api.state.meta.isDirty && password.api.state.meta.errors) {
               @for (error of password.api.state.meta.errors; track $index) {
                <span class="label-text-alt text-red-600">{{ error.message }}</span>
               }
              }
            </div>
          </ng-container>
            <button type="button" class="w-full py-2 px-4 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
            type="submit"
            [disabled]="!canSubmit()"
            >
            <span *ngIf="isSubmitting()" class="loading loading-spinner"></span>
            {{ isSubmitting() ? 'Signing up...' : 'Sign up' }}
            </button>
          </form>

          <p class="mt-4 text-center text-gray-400">
            Already have an account?
            <a routerLink="/login" class="text-primary-400 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
 private authService = inject(AuthService);
 public formService = inject(FormService);

 onSubmit = (values: SignUpSchema) => {
  this.authService.signUp(values.email, values.password);
 }

 // Clean destructuring approach
 private formResult = this.formService.injectZodForm<typeof signUpSchema, SignUpSchema>(signUpSchema, this.onSubmit, {
  email: "",
  password: "",
  name: "",
 });

 // Destructure the properties
 form = this.formResult.form;
 canSubmit = this.formResult.canSubmit;
 isSubmitting = this.formResult.isSubmitting;

}
