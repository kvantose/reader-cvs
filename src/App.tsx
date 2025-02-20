import { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import error from "./assets/err.png"
interface CSVRow {
  name: string;
  art: string;
  price: number;
  img: string;
}

const App = () => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);

  useEffect(() => {
    fetch('/catalog.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse<CSVRow>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result: ParseResult<CSVRow>) => setCsvData(result.data), // ✅ Указан тип
          error: (err: unknown) => console.error("Ошибка при парсинге CSV:", err), // ✅ Указан тип ошибки
        });
      })
      .catch((error: Error) => console.error("Ошибка при чтении файла:", error)); // ✅ Тип для fetch ошибки
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Каталог из CVS</h2>

      <div className='flex flex-row gap-10 flex-wrap'>
        {csvData.length > 0 ? (
          csvData.map((row, index) => (
            <div key={index} className="p-4 mb-4 flex items-center gap-4">
              <img src={row.img ? row.img : error} alt={`${row.name}`}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => (e.currentTarget.src = '/err.png')} />
              <div>
                <p><strong>Название:</strong> {row.name}</p>
                <p><strong>Артикул:</strong> {row.art}</p>
                <p><strong>Цена: </strong>
                  {row.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    </div>
  );
};

export default App;
