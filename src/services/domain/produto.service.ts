import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produtos.dto";


@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseURL}/produtos/${produto_id}`)
    }

    findByCategoria(categoria_id: string, page : number = 0, linesPerPage : number = 24){
        return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseURL}/prod${id}.jpg`
        return this.http.get(url, {responseType: "blob"})
    }

    getSmallImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: "blob"})
    }
}