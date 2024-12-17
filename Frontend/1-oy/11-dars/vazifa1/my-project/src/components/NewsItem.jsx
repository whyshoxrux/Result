import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export default function NewsItem({
    title,
    deleteNews,
    id,
    editNews,
    list,
    setList,
    description,
    status,
}) {
    function editedNews(newsId) {
        const news = list.find(({ id }) => id === newsId);
        const newnewsName = prompt("Create news...", news.newsName);
        const newnews = { newsName: newnewsName, id: newsId };
        setList(editNews(newnews, list));
    }

    function defineStatus(status) {
        if (status === "bajarilmagan") {
            return "destructive";
        } else if (status === "jarayonda") {
            return "outline";
        } else {
            return "default";
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    <>
                        <p>{description}</p>
                        <strong>
                            Status:{" "}
                            {
                                <Badge variant={defineStatus(status)}>
                                    {status}
                                </Badge>
                            }
                        </strong>
                    </>
                }
            </CardContent>
            <CardFooter>
                <Button
                    className="mr-3"
                    onClick={() => {
                        confirm("Rostan newsni o'chirmoqchimisiz?") &&
                            setList(deleteNews(id, list));
                    }}
                    variant="destructive"
                    type="button"
                >
                    <TrashIcon />
                </Button>
                <Button
                    onClick={() => editedNews(id)}
                    variant="outline"
                    type="button"
                >
                    <Pencil1Icon />
                </Button>
            </CardFooter>
        </Card>
    );
}
