import { Document, Packer, Paragraph, Table, TableRow, TableCell, AlignmentType, TextRun, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import type { ServiceRecord } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const exportToWord = async (records: ServiceRecord[], date: Date) => {
  // Группировка записей по сотрудникам
  const employeeGroups = records.reduce((groups, record) => {
    const key = record.employeeName;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(record);
    return groups;
  }, {} as Record<string, ServiceRecord[]>);

  // Подсчет итогов
  const totalRevenue = records.reduce((sum, record) => sum + record.finalPrice, 0);
  const totalSalaries = records.reduce((sum, record) => sum + record.employeeSalary, 0);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Заголовок документа
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ВЕДОМОСТЬ ЕЖЕДНЕВНАЯ",
                bold: true,
                size: 32,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `за ${format(date, "d MMMM yyyy г.", { locale: ru })}`,
                size: 24,
              }),
            ],
          }),

          new Paragraph({
            text: "",
          }),

          // Таблица с данными
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
            rows: [
              // Заголовки таблицы
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Сотрудник", alignment: AlignmentType.CENTER })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Услуга", alignment: AlignmentType.CENTER })],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Клиент", alignment: AlignmentType.CENTER })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Цена", alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Скидка", alignment: AlignmentType.CENTER })],
                    width: { size: 8, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Итого", alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Зарплата", alignment: AlignmentType.CENTER })],
                    width: { size: 7, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              // Строки с данными
              ...records.map(record =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: record.employeeName })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: record.serviceName })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: record.clientName })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${record.servicePrice.toLocaleString()} ₽`, alignment: AlignmentType.RIGHT })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${record.discount}%`, alignment: AlignmentType.CENTER })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${record.finalPrice.toLocaleString()} ₽`, alignment: AlignmentType.RIGHT })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${record.employeeSalary.toLocaleString()} ₽`, alignment: AlignmentType.RIGHT })],
                    }),
                  ],
                })
              ),

              // Итоговая строка
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "ИТОГО:", alignment: AlignmentType.RIGHT })],
                    columnSpan: 5,
                  }),
                  new TableCell({
                    children: [new Paragraph({
                      text: `${totalRevenue.toLocaleString()} ₽`,
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun({ text: `${totalRevenue.toLocaleString()} ₽`, bold: true })]
                    })],
                  }),
                  new TableCell({
                    children: [new Paragraph({
                      text: `${totalSalaries.toLocaleString()} ₽`,
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun({ text: `${totalSalaries.toLocaleString()} ₽`, bold: true })]
                    })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            text: "",
          }),

          // Подписи
          new Paragraph({
            children: [
              new TextRun({
                text: "Директор: _________________ ",
              }),
              new TextRun({
                text: "                    ",
              }),
              new TextRun({
                text: "Дата: _________________ ",
              }),
            ],
          }),

          new Paragraph({
            text: "",
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Администратор: _________________ ",
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Генерация и сохранение файла
  const blob = await Packer.toBlob(doc);
  const fileName = `Ведомость_${format(date, "dd-MM-yyyy", { locale: ru })}.docx`;
  saveAs(blob, fileName);
};
