import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.less']
})
export class DashboardDetailComponent implements OnInit {

  enrolledStudents: number;
  studentsWithUpToDatePayments: number;
  studentsWithOverduePayments: number;
  public chartDoughnut: any;
  public chartLine: any;
  public chartDataEnrolledStudents: any;
  public chartLabelsEnrolledStudents: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };


  constructor() {
    // Aqui você pode inicializar seus dados, talvez buscar de um serviço
  }

  ngOnInit(): void {
    this.enrolledStudents = 100;
    this.studentsWithUpToDatePayments = 70;
    this.studentsWithOverduePayments = 30;
    this.createChartDoughnut();
    this.createChartLine();
    this.createChartBar();
  }
  createChartDoughnut() {
    this.chartDoughnut = new Chart("MyChartDoughnut", {
      type: 'doughnut',
      data: {
        labels: ['Atrasados', 'Em dia', 'Vencimento em 5 dias'],
        datasets: [{
          label: 'Total: ',
          data: [50, 200, 100],
          backgroundColor: [
            'red',
            'green',
            'orange',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  createChartLine() {
    this.chartLine = new Chart("MyChartLine", {
      type: 'line',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [
          {
            label: "Cloud Coverage(%) in Lahore",
            data: [26, 29, 31, 24, 10, 3, 14, 16, 4, 5, 14, 23],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
        ,
        }
      }
    });
  }
  createChartBar() {
    this.chartLabelsEnrolledStudents = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril'
    ];
  
    this.chartDataEnrolledStudents = [
      {
        data: [330, 600, 260, 700],
        label: 'Masculinos'
      },
      {
        data: [120, 455, 100, 340],
        label: 'Femininos'
      },
      {
        data: [45, 67, 800, 500],
        label: 'Outros'
      }
    ];
  }
}
