import { CSVData } from "./types/cvs.interface";
import error from './assets/err.png'
import { useEffect, useState } from "react";

export const Paginator = ({ data, dataLimit }: CSVData) => {
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState(data.slice(0, dataLimit));
    const [findArticle, setFindArticle] = useState('');

    useEffect(() => {
        const startIndex = (currentPage - 1) * dataLimit;
        const endIndex = startIndex + dataLimit;
        setPages(Math.ceil(data.length / dataLimit));
        setPageData(data.slice(startIndex, endIndex));
    }, [currentPage, data, dataLimit]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    }

    const handleFind = () => {
        const filteredData = data.filter((row) => row.article.includes(findArticle));
        if (filteredData.length < 0) {
            return alert('Ничего не нашлось')
        }
        setPageData(filteredData.slice(0, dataLimit));
    }
    return (
        <div className="flex flex-col gap-5 items-center justify-center w-full">
            <div className="flex flex-row gap-3 w-full items-center justify-center">
                <input placeholder="Артикул" onChange={(e) => setFindArticle(e.target.value)}
                    className="border border-gray-300 p-2" onKeyDown={(e) => e.key === "Enter" && handleFind} />
                <button onClick={handleFind} onKeyDown={(e) => e.key === "Enter" && handleFind()}>Найти</button>
            </div>
            <div className='flex flex-wrap gap-3 items-center justify-center'>
                {pageData.length > 0 ? (
                    pageData.map((row, index) => (
                        <div key={index} className="card-paginator p-4 mb-4 flex md:flex-row flex-col items-center gap-4 border border-gray-300 md:w-1/4 w-full">
                            <img src={row.img ? row.img : error} alt={`${row.description}`}
                                className="img-paginator md:w-20 h-full object-cover "
                                onError={(e) => (e.currentTarget.src = '/err.png')} />
                            <div className="w-full">
                                <p><strong>Название:</strong> {row.description}</p>
                                <p><strong>Артикул:</strong> {row.article}</p>
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
            <div className="flex justify-center items-center gap-3 mt-4"
                style={{ display: pageData.length > 0 ? 'flex' : 'none' }}>
                <button className="bg-blue-900" onClick={() => setCurrentPage(1)}>{'<<'}</button>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage} of {pages}</span>
                <button onClick={handleNextPage} disabled={currentPage === pages}>Next</button>
                <button className="bg-blue-900" onClick={() => setCurrentPage(pages)}>{'>>'}</button>
            </div>
        </div>
    )
}