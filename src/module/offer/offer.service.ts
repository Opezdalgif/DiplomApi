import { Injectable } from '@nestjs/common';
import {
    Table,
    TableRow,
    TableCell,
    Paragraph,
    TextRun,
    AlignmentType,
    VerticalAlign,
    Document,
    Packer,
} from 'docx';
import * as fs from 'fs';
import { text } from 'stream/consumers';
import { PurchaseListService } from '../product/services/purchase-list.service';
import { OfferCreateDto } from './dto/offer-create.dto';

@Injectable()
export class OfferService {
    constructor(private readonly purchaseListService: PurchaseListService) {}

    async createKp(dto: OfferCreateDto) {
        const list = await this.purchaseListService.getExists({
            id: dto.listId,
        });

        const table = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'Стальная компания',
                                            font: 'Cambria',
                                            size: 36,
                                        }),
                                    ],
                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: '****',
                                            font: 'Cambria',
                                            size: 22,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'Коммерческий директор',
                                            font: 'Cambria',
                                            size: 28,
                                        }),
                                    ],
                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'Щербина Александр Валерьевич',
                                            font: 'Cambria',
                                            size: 28,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'ИНН ************',
                                            font: 'Cambria',
                                            size: 28,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'ОГРНИП ****************',
                                            font: 'Cambria',
                                            size: 28,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                        }),

                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'Юр.адрес:Оренбургская обл, г.Оренбург',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'пр. Победы, 116/5',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'тел./факс 8(353)243-77-02',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'E-mail: stal-kom@inbox.ru',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'P/c ********************, Филиал',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],
                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: '(Центральный) Банк ВТБ (ПАО) в г.Москве)',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],

                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'кор/c ********************, БИК *********',
                                            font: 'Cambria',
                                            size: 25,
                                        }),
                                    ],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });


        const tableCalculation = new Table({
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
                                            font: 'Cambria',
                                            size: 26,
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
                                            font: 'Cambria',
                                            size: 26,
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
                                            font: 'Cambria',
                                            size: 26,
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
                                            font: 'Cambria',
                                            size: 26,
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `руб`,
                                            bold: true,
                                            font: 'Cambria',
                                            size: 26,
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
                                            font: 'Cambria',
                                            size: 26,
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `руб`,
                                            bold: true,
                                            font: 'Cambria',
                                            size: 26,
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
            const table3 = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${k}`,
                                        font: 'Cambria',
                                        size: 26,
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
                                        font: 'Cambria',
                                        size: 26,
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
                                        font: 'Cambria',
                                        size: 26,
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
                                        font: 'Cambria',
                                        size: 26,
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
                                        font: 'Cambria',
                                        size: 26,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
            sum += i.product.priceRu * i.count;

            console.log(i.product.name);
            await tableCalculation.addChildElement(table3);
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
                                    font: 'Cambria',
                                    size: 26,
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
                                    font: 'Cambria',
                                    size: 26,
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });
        await tableCalculation.addChildElement(tableSum);

        console.log(sum);
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        table,
                        new Paragraph({}),
                        new Paragraph({}),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Лист закупок',
                                    bold: true,
                                    font: 'Cambria',
                                    size: 26,
                                }),
                            ],

                            alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({}),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `    Стальная компания`,
                                   
                                    font: 'Cambria',
                                    size: 26,
                                }),
                                new TextRun({
                                    text: `\t согласовала покупку оборудывания по предоставленному листу закупок`,
                                    font: 'Cambria',
                                    size: 26,
                                }),
                            ],
                            alignment: AlignmentType.LEFT,
                        }),
                        new Paragraph({}),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `    Всё преобретаемое оборудывание представлено в таблице ниже. В последнем столбце указана итоговая стоимость всей закупки`,
                                    font: 'Cambria',
                                    size: 26,
                                }),
                            ],
                            alignment: AlignmentType.LEFT,
                        }),
                        new Paragraph({}),
                        tableCalculation,
                        new Paragraph({}),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Щербина Александр Валерьевич                   ____________(Подпись)`,
                                    font: 'Cambria',
                                    size: 26,
                                }),
                            ],
                        }),

                    ],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);

        if (!fs.existsSync('results')) {
            fs.mkdirSync('results', { recursive: true });
        }

        const fileName = `results/${Date.now()}_${list.title}.docx`;
        fs.writeFileSync(fileName, buffer);

        return `/${fileName}`;
    }
}
