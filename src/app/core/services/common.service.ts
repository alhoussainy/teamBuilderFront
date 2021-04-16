import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Injectable()
export class CommonService {
    constructor(public http: HttpClient) {}
    apiUrl: string = environment.apiUrl;
    s3PublicUrl: string = 'https://tbr-companyfiles.s3.eu-west-3.amazonaws.com/';

    // Decoding image buffer
    ab2str(arraybuffer) {
        return new TextDecoder('utf-8').decode(new Uint8Array(arraybuffer));
    }
}
