// import { Component } from '@angular/core';
// import { AppService } from '../../providers/app.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@upupa/auth';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, FormDesign, selectField } from '@upupa/dynamic-form';
import {FileUploadService} from "@upupa/dynamic-form-material-theme"
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { ColumnsDescriptor } from '@upupa/table';
// import { EChartsOption } from 'echarts';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { AppService } from '../../providers/app.service';

@Component({
    templateUrl: 'dashboard-page.html',
    styleUrls: ['dashboard-page.scss']
})
export class DashboardPage {

    loading = new ReplaySubject<boolean>(1);
    // @ViewChild('statu') statu: ElementRef;
    @Input()
    //  ngClass: string | string[] | Set<string> | { [klass: string]: any; }
    @Input() model: { email: string, username: string, password: string } & any = {} as any;
    form: any
    user: User
    requestType: any;

    order: PaymentRequest
    todos = [];
    // chartOption: EChartsOption
    //  table: string[] = ["data-status"]
    isCreated: boolean = false;
    isApprouved: boolean = false;
    isRejected: boolean = false;
    isManag: boolean = false;
    isAccountant: boolean = false;

    arrayReq = [];


    submitBtn: ActionDescriptor = { variant: 'raised', name: 'submit', text: 'search', color: 'primary' };
    formStyle: CollectStyle = 'linear';
    initialValueFactory: any;
    nextBtn: ActionDescriptor = { variant: 'flat', name: 'next', text: 'next', color: '' };
    prevBtn: ActionDescriptor = { variant: 'flat', name: 'prev', text: 'prev', color: '' };
    design: FormDesign = {
        verticalAlignment: 'center',
        horizontalAlignment: 'center'
    } as FormDesign;

    formOptions = {
        formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
        formFields: [

            selectField('employeeId', 'Employee', new DataAdapter(new ServerDataSource(this.ds, 'user', ['_id', 'name']), '_id', 'name')),

            // selectField('status', 'Status', new DataAdapter(new ClientDataSource(FormStatusArray))),

        ],
        formStyle: 'linear',
        successHandler: {
            onSuccess: (auth, router) => {
                return router.navigateByUrl('/')
            }
        },
        links: (languageService: LanguageService, route: ActivatedRoute) => {
            return [{ label: 'signin-label', text: 'signin-text', url: `/${languageService.language}/account/signin` } as PageNavigationLink]
        }
    }
    private myChart: any = null;

    // PIE ECHART 
    // piechart() {
    //     this.chartOption = {
    //         tooltip: {
    //             trigger: 'item'
    //         },
    //         legend: {
    //             top: '4%',
    //             bottom: 'right',
    //             // orient: 'vertical',
    //         },
    //         series: [
    //             {
    //                 name: 'Access From',
    //                 type: 'pie',
    //                 radius: ['40%', '70%'],
    //                 avoidLabelOverlap: false,
    //                 itemStyle: {
    //                     borderRadius: 10,
    //                     borderColor: '#fff',
    //                     borderWidth: 2
    //                 },
    //                 label: {
    //                     show: false,
    //                     position: 'center'
    //                 },
    //                 emphasis: {
    //                     label: {
    //                         show: true,
    //                         fontSize: '40',
    //                         fontWeight: 'bold'
    //                     }
    //                 },
    //                 labelLine: {
    //                     show: false
    //                 },
    //                 data: this.todos
    //             }
    //         ]
    //     };

    // }


    // BAR ECHARTS

    option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };


    // // ds: DataService;

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService, private auth: AuthService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute, public fileupload: FileUploadService) {

        this.form = this.formOptions.formFields;



    }

    collection: string;
  
    async ngOnInit() {
    

        this.appService.title.next('Dashboard')

        let counter = 0;
        let key = 0;
        let j = 0;
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let objOrder = {
            value: counter, name: 'Payment Order'
        };

        let objRq = {
            value: key, name: 'Payment request'
        };

        let objPuRq = {
            value: j, name: 'purchase request'
        };

        let objAdv = {
            value: a, name: 'advance'
        };

        let objDL = {
            value: b, name: 'daily leave'
        };

        let objHl = {
            value: c, name: 'hourly leave'
        };

        let objJAbs = {
            value: d, name: 'justify absence'
        };


        this.todos.push(objOrder, objRq, objPuRq, objAdv, objDL, objHl, objJAbs)

        // this.piechart();

    }

}
