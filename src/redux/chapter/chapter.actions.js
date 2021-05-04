import { ToastAndroid } from "react-native";

import {
    CHAPTER_READ,
    GET_CHAPTER,
    CHAPTER_LOADING,
    CHAPTER_DOWNLOADING,
    CHAPTER_DOWNLOADED,
    CHAPTER_DELETED,
} from "./chapter.types";

import { fetchChapter } from "../../Services/Source/source";

import {
    markChapterRead,
    isChapterDownloaded,
    getChapter,
    downloadChapter,
    deleteChapter,
} from "../../Database/queries/ChapterQueries";
import { SET_LAST_READ } from "../preferences/preference.types";

export const getChapterAction = (
    extensionId,
    chapterUrl,
    novelUrl,
    novelId
) => async (dispatch) => {
    dispatch({ type: CHAPTER_LOADING });

    let chapter = await getChapter(novelId);

    if (!chapter) {
        chapter = await fetchChapter(extensionId, novelUrl, chapterUrl);
    }
    console.log(isDownloaded);
    dispatch({ type: GET_CHAPTER, payload: chapter });
};

export const markChapterReadAction = (chapterId, novelId) => async (
    dispatch
) => {
    await markChapterRead(chapterId);

    dispatch({
        type: CHAPTER_READ,
        payload: { chapterId },
    });

    dispatch({
        type: SET_LAST_READ,
        payload: { novelId, chapterId },
    });
};

export const downloadChapterAction = (
    extensionId,
    novelUrl,
    chapterUrl,
    chapterName,
    chapterId
) => async (dispatch) => {
    dispatch({
        type: CHAPTER_DOWNLOADING,
        payload: {
            chapterId,
        },
    });

    await downloadChapter(extensionId, novelUrl, chapterUrl, chapterId);

    dispatch({
        type: CHAPTER_DOWNLOADED,
        payload: { chapterId },
    });

    ToastAndroid.show(`Downloaded ${chapterName}`, ToastAndroid.SHORT);
};

export const deleteChapterAction = (chapterId, chapterName) => async (
    dispatch
) => {
    await deleteChapter(chapterId);

    dispatch({
        type: CHAPTER_DELETED,
        payload: { chapterId },
    });

    ToastAndroid.show(`Deleted ${chapterName}`, ToastAndroid.SHORT);
};
