import { Dispatch } from 'client/types/actions';
import { IDocumentListService } from 'client/types/services';
import { EDocumentListAction } from 'client/types/actions';

export const createActions = (dispatch: Dispatch, documentListService: IDocumentListService) => ({
    loadDocumentList() {
        dispatch({
            type: EDocumentListAction.LOAD_START,
            payload: null,
        });
        documentListService.getDocumentList()
        .then(documents => {
            dispatch({
                type: EDocumentListAction.LOAD_SUCCESS,
                payload: documents,
            });
        })
        .catch(error => {
            dispatch({
                type: EDocumentListAction.LOAD_ERROR,
                payload: error,
            });
        });
    }
});
