import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient,
        public storage: StorageService,
        public imageUtil: ImageUtilService) {
    }



    findByEmail(email: String) {
        return this.http.get(`${API_CONFIG.baseURL}/clientes/email?value=${email}`);
    }
    findById(id: String) {
        return this.http.get(`${API_CONFIG.baseURL}/clientes/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtil.dataUriToBlob(picture);
        let formData: FormData = new FormData();

        formData.set("file", pictureBlob, "file.png");

        return this.http.post(
            `${API_CONFIG.baseURL}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}