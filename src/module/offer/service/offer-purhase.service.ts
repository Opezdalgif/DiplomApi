import { BadRequestException, Injectable } from "@nestjs/common";
import { PurchaseListService } from "src/module/product/services/purchase-list.service";
import { OfferPurchaseCreateDto } from "../dto/offer-purhase-create.dto";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import * as fs from 'fs';
import { StatisticsService } from "src/module/statistics/statistics.service";

@Injectable()
export class OfferPurchaseService {
    constructor(
        private readonly purchaseListService: PurchaseListService, 
        private readonly statisticsService: StatisticsService
    ){}

    async createPurchaseEquipment(dto: OfferPurchaseCreateDto) {
        const list = await this.purchaseListService.getExists({
            id: dto.listId
        })

        const today = new Date();
 
        const now = today.toLocaleDateString('en-US');
        console.log(now);
        const todayNow = now.split('/')
       

        const tableTitles = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `№`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Наименование`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Кол-во`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Цена,`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `руб`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Сумма,руб`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `руб`,
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 28,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]
        })
          let sum= 0;
          let k = 0
          for(let i of list.products) {
            k++
            const tableProduct = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${k}`,
                                        font: 'Times New Roman',
                                        size: 28,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${i.product.name}`,
                                        font: 'Times New Roman',
                                        size: 28,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${i.count}`,
                                        font: 'Times New Roman',
                                        size: 28,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${i.product.priceRu}`,
                                        font: 'Times New Roman',
                                        size: 28,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${i.product.priceRu * i.count}`,
                                        bold: true,
                                        font: 'Times New Roman',
                                        size: 28,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
            sum += i.product.priceRu * i.count;

            console.log(i.product.name);
            await tableTitles.addChildElement(tableProduct);
        }

        const tableSum = new TableRow({
            children: [
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Сумма общая',
                                    font: 'Times New Roman',
                                    size: 28,
                                }),
                            ],
                        }),
                    ],
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${sum}`,
                                    font: 'Times New Roman',
                                    size: 28,
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });
        await tableTitles.addChildElement(tableSum);

        const doc = new Document({
            sections:[
                {
                    properties: {},
                    children:[
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `    Заказ №${list.id} от ${todayNow[1]}.${todayNow[0]}.${todayNow[2]}`,
                                    bold: true,
                                    font: 'Times New Roman',
                                    size: 32,
                                })
                            ]
                        }),
                        new Paragraph({}),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `    Заказчик: ООО "Стальная компания", ИНН 5610213785, КПП 561001001, Область Оренбургская г. Оренбург ул. Туркестанская  Д. 37 КВ. 14.
                                    `,
                                    font: 'Times New Roman',
                                    size: 28,
                                })
                            ]
                        }),

                        new Paragraph({}),
                        tableTitles,
                        new Paragraph({}),
                        new Paragraph({
                            children:[
                                new TextRun({
                                    text: `    Коммерческий директор Щербина А.В          _______________ (подпись)`,
                                    font: `Times New Roman`,
                                    size: 28
                                })
                            ]
                        })
                    ]
                }
            ]
        })

        const buffer = await Packer.toBuffer(doc);
        
        if (!fs.existsSync('results')) {
            fs.mkdirSync('results', { recursive: true });
        }
        const dateTime = new Date();
        let date = dateTime.toLocaleDateString();
        let dateArr = date.split('.');

        const fileName = `results/${Date.now()}_${list.title}.docx`;
        fs.writeFileSync(fileName, buffer);
        list.purchase = `/${fileName}`
        list.download = true
    
        try {
            await list.save()
            await this.statisticsService.create(Number(dateArr[1]), Number(dateArr[2]), list.title)
        } catch (e) {
            console.log(e)
            throw new BadRequestException(`Произошла ошибка в создании закупки оборудования`)
        }
        
    }

    
}