import { NewsItem } from "./NewsItem";
import { deleteNews, editNews } from "./CRUD";

export function NewsParent() {
    return (
        <ul className="grid grid-cols-3 gap-5">
            {list.length > 0 ? (
                list.map(({ newsName, id, newsBody, newsStatus }) => {
                    return (
                        <li key={id}>
                            <NewsItem
                                id={id}
                                editNews={editNews}
                                deleteNews={deleteNews}
                                setList={setList}
                                list={list}
                                title={newsName}
                                description={newsBody}
                                status={newsStatus}
                            ></NewsItem>
                        </li>
                    );
                })
            ) : (
                <li className="text-center">No data</li>
            )}
        </ul>
    );
}
