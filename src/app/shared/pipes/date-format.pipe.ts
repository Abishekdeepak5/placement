import { Pipe , PipeTransform} from "@angular/core";
@Pipe({
    standalone: true,
    name: "dateformat"
})
export class DateformatPipe implements PipeTransform{
    transform(value: any):string {
        const inputDate = new Date(value);
        // return inputDate.toLocaleString();
        return inputDate.toLocaleDateString('en-GB');
        
    }
}