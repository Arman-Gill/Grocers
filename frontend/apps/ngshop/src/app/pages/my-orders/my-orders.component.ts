import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalstorageService } from '@bluebits/users';
@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();
  userInfo: any;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private ls: LocalstorageService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  getSession() {
    this.userInfo = this.ls.getSessionInfo();
    console.log(this.userInfo);
  }
  _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        orders.forEach((ord) => {
          if (ord.user._id == this.ls.getSessionInfo().userId) this.orders.push(ord);
        });
        //this.orders = orders;
      });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`myorders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrder(orderId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted!'
              });
            }
          );
      }
    });
  }
}
