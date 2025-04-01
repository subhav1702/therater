import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import helper from '@/services/helper';
import { createorUpdateDocument, downloadFile, deleteDocument, deleteFile } from '@/services/helperFirebase';
import { LoaderCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import parse from 'html-react-parser';
import Quill from 'quill'
const Link = Quill.import('formats/link');

export default function CardDemo({ className, mediaData, removeMediaData, setMediaLoading, userType, ...props }) {
    const [mediaFile, setMediaFile] = useState('');
    const [open, setOpen] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    useEffect(() => {
        Link.sanitize = function (url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                return `http://${url}`
            }
            return url;
        }
        getMedia();
    }, []);

    async function getMedia() {
        try {
            let image = await downloadFile(`/Media/`, mediaData.mediaPath);
            setMediaFile(image);
            setLoadingImage(false)
        } catch (error) {
            console.error("Failed to load media", error);
        }
    }


    async function removeMedia() {
        let mediaId = mediaData?.mediaId
        let mediaPath = mediaData?.mediaPath
        let mediaType = mediaData?.mediaType

        try {
            let confirmDelete = window.confirm("Are you sure you want to remove this media?");
            if (confirmDelete) {
                setMediaLoading(true)
                const result = await deleteDocument('Media', mediaId)
                if (result.statusCode === 200) {
                    await deleteFile(`/Media/`, mediaPath);
                    if (mediaType === "image") {
                        await deleteFile(`/Media/thumbnail/`, mediaPath);
                    }

                    alert("Media remove successfully");
                    removeMediaData(mediaId)
                    setMediaLoading(false)
                    return true;
                }
                setMediaLoading(false)
                return false;
            }
        } catch (error) {
            setMediaLoading(false)
            console.error('Error removing media:', error);
        }
    }


    return (
        <>
            <Card className={cn(" text-center gap-4", className)} {...props} >
                <CardContent className="grid h-2/5 gap-4 pt-6" >
                    <div onClick={() => setOpen(true)} className="cursor-pointer">
                        {!loadingImage ?
                            <>
                                {mediaData.mediaType === "image" && (
                                    <div className="justify-center flex">
                                        {mediaFile && <img src={mediaFile} className="h-64" alt="product image" />}
                                    </div>
                                )}

                                {mediaData.mediaType === "video" && mediaFile && (
                                    <div className="justify-center flex ">
                                        <video controls className="h-64">
                                            <source src={mediaFile} />
                                        </video>
                                    </div>
                                )}
                            </>
                            :
                            <div className="flex justify-center mt-10">
                                <LoaderCircle className="ml-1  animate-spin" size={40} />
                            </div>
                        }

                        <div className="flex items-center space-x-4 rounded-md border p-4 mt-8">
                            <CardDescription>
                                {helper.removeHtmlFromString(mediaData?.description,8)}
                            </CardDescription>
                        </div>
                    </div>
                    {userType !== 4 &&
                        <CardFooter className="p-0 justify-end">
                            <Trash2 onClick={removeMedia} className="p-0 justify-end cursor-pointer" />
                        </CardFooter>
                    }
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="md:max-w-[35%] max-w-[80%]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>
                    <div className="flex flex-wrap">
                        <div className="w-full  px-4">
                            <div className="relative w-full mb-3 flex justify-center">
                               
                                <div className="mt-4 border-2 w-10/12 md:w-6/12">
                                    {(mediaData.mediaType === "image") && (

                                        <img
                                            src={mediaFile}
                                            alt="Uploaded file preview"
                                            className="w-full p-2"
                                        />

                                    )}
                                    {(mediaData.mediaType === "video") && (
                                        <video className="w-full p-2">
                                            <source src={mediaFile} />
                                            Your browser does not support the video element.
                                        </video>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3 ">
                              
                                <ScrollArea className="h-60 md:h-76 lg:h-90">
                                    <div className="h-4/6 md:h-5/6 list-decimal" >
                                        {parse(mediaData?.description)}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
