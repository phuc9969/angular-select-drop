import { Component, VERSION } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedLocations = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' },
    { id: 4, name: 'Location 4' },
    { id: 5, name: 'Location 5' },
    { id: 6, name: 'Location 6' },
  ];

  pointerPosition = { x: 0, y: 0 };

  // Theo dõi khi kéo di chuyển
  onDragMoved(event: CdkDragMove<any>) {
    this.pointerPosition = {
      x: event.pointerPosition.x,
      y: event.pointerPosition.y,
    };
  }

  // Xử lý sự kiện thả
  drop(event: CdkDragDrop<any>) {
    const allItems = document.querySelectorAll('.drag-item');
    let calculatedIndex = event.currentIndex;

    // Duyệt qua tất cả các mục trong DOM để xác định vị trí thả dựa vào tọa độ con trỏ
    allItems.forEach((item: any, index: number) => {
      const rect = item.getBoundingClientRect();

      // Kiểm tra tọa độ chuột trong khoảng của mục hiện tại
      if (
        this.pointerPosition.x >= rect.left &&
        this.pointerPosition.x <= rect.right &&
        this.pointerPosition.y >= rect.top &&
        this.pointerPosition.y <= rect.bottom
      ) {
        calculatedIndex = index;
      }
    });

    // if (event.previousIndex !== calculatedIndex) {
    //   moveItemInArray(
    //     this.selectedLocations,
    //     event.previousIndex,
    //     calculatedIndex
    //   );
    // }

    // this.selectedLocations = [...this.selectedLocations];
    // Chỉ hoán đổi 2 vị trí mà không ảnh hưởng đến vị trí của các phần tử khác
    if (event.previousIndex !== calculatedIndex) {
      // Lấy phần tử được kéo và phần tử được thả
      const draggedItem = this.selectedLocations[event.previousIndex];
      const targetItem = this.selectedLocations[calculatedIndex];

      // Hoán đổi vị trí 2 phần tử
      this.selectedLocations[event.previousIndex] = targetItem;
      this.selectedLocations[calculatedIndex] = draggedItem;
    }
    this.selectedLocations = [...this.selectedLocations];
    console.log('Vị trí thả:', calculatedIndex);
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(
  //     'Drop happened! From',
  //     event.previousIndex,
  //     event.previousContainer === event.container,
  //     this.selectedLocations,
  //     'to',
  //     event.currentIndex
  //   );

  //   const previousIndex = event.previousIndex;
  //   const currentIndex = event.currentIndex;

  //   // Chỉ hoán đổi 2 vị trí mà không ảnh hưởng đến vị trí của các phần tử khác
  //   if (previousIndex !== currentIndex) {
  //     // Lấy phần tử được kéo và phần tử được thả
  //     const draggedItem = this.selectedLocations[previousIndex];
  //     const targetItem = this.selectedLocations[currentIndex];

  //     // Hoán đổi vị trí 2 phần tử
  //     this.selectedLocations[previousIndex] = targetItem;
  //     this.selectedLocations[currentIndex] = draggedItem;
  //   }
  //   this.selectedLocations = [...this.selectedLocations];
  //   console.log(this.selectedLocations);

  //   // else {
  //   //   transferArrayItem(event.previousContainer.data,
  //   //                     event.container.data,
  //   //                     event.previousIndex,
  //   //                     event.currentIndex);
  //   // }
  // }
}
