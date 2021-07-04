
export class MessageDetail {
    code?: string;
    message: string="";
}
export class Error extends MessageDetail {
    
}
export class ValidationError extends Error {
    field?: string;
}
export class Warning extends MessageDetail {
    
}

export class ErrorResponse extends MessageDetail {
    errors?: ValidationError[];
}
export class WarningResponse extends MessageDetail {
    warnings?: Warning[];
}

export class AddResponse {
    id: string='';
    location?: string;
}

export class BulkOperationResponse{
    affectedItems?: number;	
    warning?: WarningResponse;
}