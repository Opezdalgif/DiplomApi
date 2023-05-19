import { Injectable } from "@nestjs/common";
import { AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import * as fs from 'fs';

@Injectable()
export class OfferSupplierService {

    constructor(

    ){}

    async createOfferSupplier(supplierName: string){

        const dateTime = new Date();
        let date = dateTime.toLocaleDateString();
        let dateArr = date.split('/');
        let yearDate = Number(dateArr[2]) + 1;

        const doc = new Document({
            sections: [
              {
                properties: {},
                children: [
                  
                            new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: 'Договор \n о сотрудничестве и совместной деятельности',  
                                        font: 'Times New Roman',
                                        size: 28
                                        
                                    }),
                                    
                                ],
                                leftTabStop: 46,
                                alignment: AlignmentType.CENTER                            
                            }),
                            new Paragraph({}),
                            new Paragraph({
                                children:[
                                    new TextRun({
                                        text: `г. Оренбург                                                                                   ${dateArr[0]}.${dateArr[1]}.${dateArr[2]} г.` ,  
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ]  ,
                                leftTabStop: 46,
                            }),
                            new Paragraph({}),
                            new Paragraph({
                                children:[
                                    new TextRun({
                                        text: '    Общество с ограниченной ответственностью «Стальная компания» (далее – Товарищ 1) действующего на основании устава, с одной стороны, и', 
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ] ,
                                leftTabStop: 46,
                            }),
                            new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: `    Общество с ограниченной ответственностью «${supplierName}» (далее – Товарищ 2) действующего на основании устава, с другой стороны, вместе именуемые Стороны, заключили настоящий Договор о нижеследующем:`,  
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ] ,
                                leftTabStop: 46, 
                            }),
                            new Paragraph({}),
                            new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '1. ПРЕДМЕТ ДОГОВОРА' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                alignment: AlignmentType.CENTER  ,
                                leftTabStop: 46,
                            }),
                            new Paragraph({}),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '   1.1. Согласно настоящему Договору Стороны обязуются соединить свои вклады и совместно действовать без образования юридического лица для извлечения прибыли.' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46, 
                            }),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    1.2. Совместная деятельность осуществляется в следующих направлениях: организация спортивных мероприятий.'  ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46, 
                                
                            }),
                            new Paragraph({}),
                            new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '2. ВЕДЕНИЕ ОБЩИХ ДЕЛ ТОВАРИЩЕЙ.\n ПРАВО НА ИНФОРМАЦИЮ',
                                        font: 'Times New Roman',
                                        size: 28
                                    }),
                                ],
                                alignment: AlignmentType.CENTER  ,
                                leftTabStop: 46,
                                 
                            }),
                            new Paragraph({}),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    2.1. При ведении общих дел каждый Товарищ вправе действовать от своего имени.',
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46,
                                
                            }),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    2.2. В отношениях с третьими лицами полномочие одного Товарища совершать сделки от имени всех Товарищей удостоверяется соответствующей доверенностью.' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46,
                            }),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    2.3. Товарищи имеют равное право на ознакомление со всей документацией по ведению дел.' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46, 
                            }),
                            new Paragraph({}),
                            new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '3. ПРЕКРАЩЕНИЕ ДОГОВОРА',
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                alignment: AlignmentType.CENTER  ,
                                leftTabStop: 46, 
                            }),
                            new Paragraph({}),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    3.1. Договор прекращается вследствие:',
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46, 
                                
                             }),
                              new Paragraph({
                                children:[
                                    new TextRun({
                                        text: '    3.1.1. Объявления кого-либо из Товарищей несостоятельным (банкротом).' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46,  
                            }),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    3.1.2. Ликвидации участвующего в настоящем Договоре юридического лица.' ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46,
                            }),
                              new Paragraph({
                                children:[
                                    new TextRun({
                                        text: '    3.1.3. Расторжения настоящего Договора по требованию одного из Товарищей в отношениях между ним и остальными Товарищами.'  ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ] ,
                                leftTabStop: 46,  
                            }),
                              new Paragraph({ 
                                children:[
                                    new TextRun({
                                        text: '    3.1.4. Истечения срока Договора простого товарищества.'  ,
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                leftTabStop: 46, 
                            }),
                            new Paragraph({}),
                            new Paragraph({
                                children:[
                                    new TextRun({
                                        text: '4. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ',
                                        font: 'Times New Roman',
                                        size: 28
                                    })
                                ],
                                alignment: AlignmentType.CENTER  ,
                                leftTabStop: 46,    
                            }),
                            new Paragraph({}),
                              new Paragraph({  
                                children:[
                                new TextRun({
                                    text: `    4.1. Настоящий Договор вступает в силу с момента его подписания обеими Сторонами и действует до ${dateArr[0]}.${dateArr[1]}.${yearDate}.`,
                                    font: 'Times New Roman',
                                    size: 28
                                })
                            ],
                            leftTabStop: 46, 
                            })


                    ],
                }
            ]
        })
                            
                            
                       
                     
          
          const buffer = await Packer.toBuffer(doc);
        
          if (!fs.existsSync('results')) {
              fs.mkdirSync('results', { recursive: true });
          }
  
          const fileName = `results/${Date.now()}_${supplierName}.docx`;
          fs.writeFileSync(fileName, buffer);
  
          return `/${fileName}`;
    }
}