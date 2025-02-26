import { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { Paginator } from './Paginator';
import "./App.css"
interface CSVRow {
  article: string;
  description: string;
  price: number;
  img: string;
}

const App = () => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [resDara, setResDara] = useState<CSVRow[]>([]);
  useEffect(() => {
    fetch('/siemens.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse<CSVRow>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result: ParseResult<CSVRow>) => setCsvData(result.data),
          error: (err: unknown) => console.error("Ошибка при парсинге CSV:", err),
        });
      })
      .catch((error: Error) => console.error("Ошибка при чтении файла:", error));
  }, []);


  useEffect(() => {
    if (csvData.length > 0) {
      const filteredData = csvData.filter((row) => row.price > 300);
      setResDara(filteredData);
    }
  }, [csvData]);

  return (
    <div className="w-full p-10">
      <h2 className="text-2xl font-bold mb-4">Каталог из CVS</h2>
      <Paginator data={resDara} dataLimit={21} />
    </div>
  );
};

export default App;
