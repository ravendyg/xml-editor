import { IDocumentListService } from 'client/types/services';
import { DocumentInfo } from 'client/types/dataTypes';

export function createDocumentListService(): IDocumentListService {
    return {
        getDocumentList(): Promise<DocumentInfo []> {
            // TODO: replace with an actual call to the server
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            name: 'document 1'
                        },
                        {
                            name: 'document 2'
                        },
                    ]);
                }, 1000);
            });
        }
    };
}
