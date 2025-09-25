import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-ad-banner',
  styles: `
    :host {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 175px;
      width: 100%;
      background: #e3f2fd;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 1rem;
      z-index: 10;
    }

    a {
      color: var(--mat-sys-primary);
      font-size: 1.2rem;
      font-weight: 500;
    }

    .title {
      font-size: 1.5rem;
    }
  `,
  template: `
    <strong class="title">Join my Pragmatic Angular Testing course!</strong>
    <p>
      Level up your Angular skills with hands-on exercises and expert guidance.
    </p>
    <a href="https://courses.marmicode.io" target="_blank"> Register Now </a>
  `,
})
export class AdBanner {}
