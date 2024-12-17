import { PlusIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { validation } from "../lib/utils";
import { addTodo } from "../crud";
import { useState } from "react";

export default function Header({ setList, list }) {
    const [openModal, setOpenModal] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        console.log("salom");

        const data = new FormData(e.target);
        const result = {};
        for (const [key, value] of data.entries()) {
            result[key] = value;
        }

        const formDataResult = validation(result);

        if (!formDataResult) {
            result.id = Date.now();
            setList(addTodo(result, list));
            setOpenModal(false);
        } else {
            toast.info(formDataResult);
        }
    }

    return (
        <header className="py-5 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-5">
                <h1 className="font-medium text-2xl">News app</h1>
                <Dialog onOpenChange={setOpenModal} open={openModal}>
                    <DialogTrigger
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        className={buttonVariants({ variant: "default" })}
                    >
                        <PlusIcon />
                        Yangi news qo'shish
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Yangi news qo'shish</DialogTitle>
                            <DialogDescription>
                                O'z orzuyingizdagi news yarating
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center justify-center flex-col py-10"
                        >
                            <div className="grid w-full mb-5 items-center gap-1.5">
                                <Label htmlFor="todo">Yangilik nomi</Label>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    id="news"
                                    name="newsName"
                                    placeholder="What's news"
                                />
                            </div>
                            <div className="grid w-full mb-5 items-center gap-1.5">
                                <Label htmlFor="newsBody">
                                    Yangilik haqida
                                </Label>
                                <Textarea
                                    id="newsBody"
                                    name="newsBody"
                                    placeholder="Yangilik haqida to'liq yozing"
                                />
                            </div>
                            <Select
                                onValueChange={() => {
                                    console.log("Ishladi");
                                }}
                                name="newsStatus"
                            >
                                <SelectTrigger className="w-full mb-5">
                                    <SelectValue placeholder="Statusni belgilang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bajarilmagan">
                                        Bajarilmagan
                                    </SelectItem>
                                    <SelectItem value="jarayonda">
                                        Jarayonda
                                    </SelectItem>
                                    <SelectItem value="bajarilgan">
                                        Bajarilgan
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Button className="w-full" type="submit">
                                Saqlash
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
