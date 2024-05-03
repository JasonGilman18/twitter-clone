import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'sign-in', component: SigninComponent},
    {path: 'register', component: RegisterComponent},
    {path: ':id/profile/:userId', component: ProfileComponent},
    {path: ':userId/feed', component: FeedComponent}
];
