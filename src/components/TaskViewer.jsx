import React, {useEffect, useState} from 'react';
import {http} from '../core/http-common';
import xml2js from 'xml2js';

const TaskViewer = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks().then();
    }, [])

    async function loadTasks() {
        try {
            let response = await http.get('/tasks',
                {
                    headers: {
                        'Accept': 'application/xml, text/xml, */*',
                        'Content-Type': 'application/xml',
                    },
                });

            // Парсим OPML с помощью xml2js
            const parser = new xml2js.Parser();
            parser.parseString(response.data, (err, result) => {
                if (err) {
                    setError('Ошибка при парсинге файла');
                    return;
                }

                // Извлекаем задачи
                const outlines = result.opml.body[0].outline || [];
                const parsedTasks = outlines.map((outline) => outline.$.text);
                setTasks(parsedTasks);
            });
        } catch (err) {
            setError('Ошибка при загрузке файла');
        } finally {
            setLoading(false);
        }
    }

    // Отображение компонента
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='viewer'>
            <h3>Список избранных задач</h3>
            <ul>
                {tasks.map((task, index) => (
                    <li onClick={(item) => item.target.classList.toggle('checked')} key={index}>{task}</li>
                ))}
            </ul>
            <style jsx="true">{`
              .viewer {
                padding-top: 20px;
              }

              ul {
                list-style-type: none;
                padding: 0;
              }

              li {
                padding: 10px;
                margin: 5px;
                background-color: #f4f4f4;
                border: 1px solid #ddd;
                cursor: pointer;
                position: relative;
              }

              li.checked {
                background-color: #cce5ff;
              }

              li::before {
                content: "";
                width: 20px;
                height: 20px;
                border: 2px solid #999;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              }

              li.checked::before {
                background-color: #007bff;
                border-color: #007bff;
              }
            `}</style>
        </div>
    );
};

export default TaskViewer;
