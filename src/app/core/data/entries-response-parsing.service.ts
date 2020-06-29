import { isNotEmpty } from '../../shared/empty.util';
import { ObjectCacheService } from '../cache/object-cache.service';
import { ErrorResponse, GenericSuccessResponse, RestResponse } from '../cache/response.models';
import { DSpaceRESTV2Response } from '../dspace-rest-v2/dspace-rest-v2-response.model';
import { DSpaceSerializer } from '../dspace-rest-v2/dspace.serializer';
import { BaseResponseParsingService } from './base-response-parsing.service';
import { ResponseParsingService } from './parsing.service';
import { RestRequest } from './request.models';
import { CacheableObject } from '../cache/object-cache.reducer';
import { GenericConstructor } from '../shared/generic-constructor';

export abstract class EntriesResponseParsingService<T extends CacheableObject> extends BaseResponseParsingService implements ResponseParsingService {

  protected toCache = false;

  constructor(
    protected objectCache: ObjectCacheService,
  ) {
    super();
  }

  abstract getSerializerModel(): GenericConstructor<T>;

  parse(request: RestRequest, data: DSpaceRESTV2Response): RestResponse {
    if (isNotEmpty(data.payload)) {
      let browseEntries = [];
      if (isNotEmpty(data.payload._embedded) && Array.isArray(data.payload._embedded[Object.keys(data.payload._embedded)[0]])) {
        const serializer = new DSpaceSerializer(this.getSerializerModel());
        browseEntries = serializer.deserializeArray(data.payload._embedded[Object.keys(data.payload._embedded)[0]]);
      }
      return new GenericSuccessResponse(browseEntries, data.statusCode, data.statusText, this.processPageInfo(data.payload));
    } else {
      return new ErrorResponse(
        Object.assign(
          new Error('Unexpected response from browse endpoint'),
          { statusCode: data.statusCode, statusText: data.statusText }
        )
      );
    }
  }

}
