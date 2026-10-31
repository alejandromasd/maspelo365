import { Component, HostListener } from "@angular/core";

@Component({
  selector: "maspelo-floating-scrollbar",
  standalone: true,
  templateUrl: "./floating-scrollbar.component.html",
  styleUrl: "./floating-scrollbar.component.css",
})
export class FloatingScrollbarComponent {
  visible = false;
  active = false;
  thumbHeight = 0;
  thumbTop = 0;
  private startY = 0;
  private startScrollY = 0;
  private dragging = false;

  constructor() {
    if (typeof window !== "undefined") window.setTimeout(() => this.update(), 0);
  }

  @HostListener("window:scroll")
  @HostListener("window:resize")
  update(): void {
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) {
      this.visible = false;
      return;
    }
    const viewport = window.innerHeight;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, viewport);
    const maxScroll = Math.max(scrollHeight - viewport, 0);
    this.visible = maxScroll > 1;
    if (!this.visible) return;
    const trackHeight = viewport - 28;
    this.thumbHeight = Math.max(56, (viewport / scrollHeight) * trackHeight);
    this.thumbTop = 14 + (window.scrollY / maxScroll) * Math.max(trackHeight - this.thumbHeight, 0);
  }

  startDrag(event: PointerEvent): void {
    event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture(event.pointerId);
    this.dragging = true;
    this.startY = event.clientY;
    this.startScrollY = window.scrollY;
    document.body.classList.add("is-dragging-scrollbar");
  }

  @HostListener("window:pointermove", ["$event"])
  moveDrag(event: PointerEvent): void {
    if (!this.dragging) return;
    const viewport = window.innerHeight;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, viewport);
    const maxScroll = Math.max(scrollHeight - viewport, 0);
    const travel = Math.max(viewport - 28 - this.thumbHeight, 1);
    const scroll = this.startScrollY + ((event.clientY - this.startY) / travel) * maxScroll;
    window.scrollTo({ top: Math.max(0, Math.min(maxScroll, scroll)), behavior: "auto" });
  }

  @HostListener("window:pointerup")
  @HostListener("window:pointercancel")
  endDrag(): void {
    this.dragging = false;
    document.body.classList.remove("is-dragging-scrollbar");
  }
}
