import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {
  Consultant,
  CreateCustomer, CreateSolution, CreateSolutionTechnology,
  Customer, CustomerAnalyticsSearch,
  DefaultFilters,
  DocType, Education,
  JwtUserHash, myListPayload, PageableResponse,
  PlaceDto, SearchFilters,
  Skill,
  socialLink, solutionAttachment, SolutionListingPayload,
  VendorCorp,
  VideoToggleType,
} from '../shared/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {EmployeeRange} from "../content/admin/admin-vendors/vendor-info/vendor-info.component";
import {FiltersDto} from "../content/admin/customer-contacts/customers-contacts.component";
import {CustomerSearchPayload} from "../content/admin/manage-customers/manage-customers.component";
import {SolutionFiltersDto} from "../client/solution-pool/solution-pool.component";
import {MemberAnalyticsSearch} from "../content/admin/member-analytics/member-analytics.component";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

  }

  getVendors(pageNumber: number, size: number, sort: string, payload: any): Observable<any> {
    return this.http.post(`${environment.url}vendors/search`, {...payload},
      {
        params: new HttpParams()
          .set('page', pageNumber)
          .set('size', size)
          .set('sort', sort)
      });
  }

  //for talent pool
  getConsultants(pageNumber: number, shortlisted: boolean, size: number, sort: string, query: string, searchEnable: boolean, active: boolean,
                 skills: number[], experience: { min: number, max: number }[], jobType: string[], locations: number[],
                 consultantId: string, title: string): Promise<any> {
    return this.http.post<any>(`${environment.url}consultant/search`, {
        query: query,
        searchEnable: searchEnable,
        active: active,
        skills: skills,
        experience: experience,
        jobTypes: jobType,
        locations: locations,
        shortlisted: shortlisted,
        consultantId: consultantId,
        title: title
      },
      {
        params: new HttpParams()
          .set('page', pageNumber)
          .set('size', size)
          .set('sort', sort)
        // .set('query',query)
      }).toPromise();
  }

  createCustomer(Payload: any,): Observable<any> {
    return this.http.post<CreateCustomer>(`${environment.url}customers`, Payload, this.httpOptions);
  }

  getCustomers(pageNumber: number, size: number, sort: string, payload: CustomerSearchPayload): Promise<any> {
    return this.http.post<any>(`${environment.url}customers/search`, {...payload},
      {
        params: new HttpParams()
          .set('page', pageNumber)
          .set('size', size)
          .set('sort', sort)
      }).toPromise();
  }

  updateCustomer(customerId: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}customers/${customerId}`, payload, this.httpOptions);
  }

  citiesSearch(query: string): Promise<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}cities/search`,
      {
        params: new HttpParams()
          .set('q', query)
      }).toPromise();
  }

  stateSearch(query: string): Promise<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}vendors/organisation/states`,
      {
        params: new HttpParams()
          .set('query', query)
      }).toPromise();
  }

  searchSkills(query: string): Promise<Skill[]> {
    return this.http.get<Skill[]>(`${environment.url}skills`,
      {
        params: new HttpParams()
          .set('query', query)
      }).toPromise();
  }

  searchConsultantSkills(query: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${environment.url}consultant/skills`, {params: new HttpParams().set('query', query)});
  }

  searchConsultantCities(query: string): Observable<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}consultant/locations`, {params: new HttpParams().set('query', query)});
  }

  defaultFilters(): Promise<DefaultFilters> {
    return this.http.get<DefaultFilters>(`${environment.url}filters`).toPromise();
  }

  getInvitation(id: string): Promise<JwtUserHash> {
    return this.http.get<JwtUserHash>(`${environment.url}invitation/${id}`).toPromise();
  }

  getOrgUser(userId: number, organisationId: number): Promise<JwtUserHash> {
    return this.http.get<JwtUserHash>(`${environment.url}organisation/${organisationId}/${userId}`).toPromise();
  }

  setInvitationPassword(data: any, userId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}invitation/${userId}`, data, this.httpOptions).toPromise();
  }

  getVendorById(id: any): Observable<any> {
    return this.http.get(`${environment.url}vendors/${id}`, this.httpOptions);
  }

  getCountries(query: any): Promise<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}country`,
      {
        params: new HttpParams()
          .set('query', query)
      }).toPromise();
  }

  getStates(countryId: string, query: any): Promise<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}state/${countryId}`, {
      params: new HttpParams()
        .set('query', query)
    }).toPromise();
  }

  getCities(stateId: string, query: any): Promise<PlaceDto[]> {
    return this.http.get<PlaceDto[]>(`${environment.url}city/${stateId}`, {
      params: new HttpParams()
        .set('query', query)
    }).toPromise();
  }

  getAllCities(query: any): Observable<PlaceDto[]> {
    const params = new HttpParams()
      .set('query', query);
    return this.http.get<PlaceDto[]>(`${environment.url}city`, {params});
  }

  getAllConsumerCities(query: any): Observable<PlaceDto[]> {
    const params = new HttpParams()
      .set('query', query);
    return this.http.get<PlaceDto[]>(`${environment.url}consumer/city`, {params});
  }

  deleteConsultantResume(consultantId: any): Promise<void> {
    return this.http.delete<void>(`${environment.url}consultant/${consultantId}/resume/delete`).toPromise();
  }

  createVendors(Payload: any,): Promise<any> {
    return this.http.post<VendorCorp>(`${environment.url}vendors`, Payload, this.httpOptions).toPromise();
  }

  updateVendors(Payload: any, vendorId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}vendors/${vendorId}`, Payload, this.httpOptions).toPromise();
  }

  updateVendorSkill(vendorId: any, skillId: any): Promise<VendorCorp> {
    return this.http.post<VendorCorp>(`${environment.url}vendors/${vendorId}/skills`, {skills: skillId}, this.httpOptions).toPromise();
  }

  deleteVendors(vendorId: any): Promise<void> {
    return this.http.delete<void>(`${environment.url}vendors/${vendorId}`).toPromise();
  }

  deleteLogo(vendorId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}vendors/${vendorId}/logo`).toPromise();
  }

  login(userPayload: any): Promise<any> {
    return this.http.post<any>
    (`${environment.url}auth/login`, userPayload, this.httpOptions).toPromise();
  }

  customerLogin(userPayload: any): Promise<any> {
    return this.http.post<any>
    (`${environment.url}auth/customer/login`, userPayload, this.httpOptions).toPromise();
  }

  getLoginUser(): Observable<any> {
    return this.http.get<any>(`${environment.url}user/me`);
  }

  getCustomerLoginUser(): Observable<any> {
    return this.http.get<any>(`${environment.url}customers/contact/me`);
  }

  getJobsummaryForClient(): Observable<any> {
    return this.http.get<any>(`${environment.url}customer/job-summary`);
  }

  // updateUser(data: FormData): Promise<any> {
  //   return this.http.put<any>(`${environment.url}user`, data).toPromise();
  // }

  updateUser(payload: any): Promise<any> {
    return this.http.put<any>(`${environment.url}customer/contact`, payload).toPromise();
  }

  uploadLogo(data: FormData,): Observable<any> {
    // if (vendorId > 0) {
    return this.http.post<any>(`${environment.url}vendors/logo-upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadLogoNext(data: FormData, vendorId: number): Observable<any> {
    // if (vendorId > 0) {
    return this.http.post<any>(`${environment.url}vendors/${vendorId}/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadCustomerLogo(data: FormData, customerId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}customers/${customerId}/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadConsultantLogo(data: FormData,): Observable<any> {
    return this.http.post<any>(`${environment.url}consultants/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadNewCustomerLogo(data: FormData,): Observable<any> {
    return this.http.post<any>(`${environment.url}customers/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteCustomerLogo(customerId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}customers/${customerId}/logo`).toPromise();
  }

  getOrganisation(id: string): Observable<any> {
    return this.http.get<any>(`${environment.url}organisation/${id}`);
  }

  updateOrganisation(id: number, data: FormData): Promise<any> {
    return this.http.put<any>(`${environment.url}organisation/${id}`, data).toPromise();
  }

  uploadDocuments(data: FormData, vendorId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}vendors/${vendorId}/documents/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getVendorDocuments(vendorId: number, pageNumber: number, size: number, archived: boolean): Promise<any> {
    return this.http.post<any>(`${environment.url}vendors/${vendorId}/documents`, {}, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
        .set('showArchived', archived)
    }).toPromise();
  }

  getDocumentType(): Promise<DocType[]> {
    return this.http.get<DocType[]>(`${environment.url}document-type`).toPromise();
  }

  getSocialLink(vendorId: number): Promise<socialLink[]> {
    return this.http.get<socialLink[]>(`${environment.url}vendor/${vendorId}/link`).toPromise();
  }

  deleteSocialLinks(vendorId: number, linkId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}vendor/${vendorId}/link/${linkId}`).toPromise()
  }

  deleteDocument(vendorId: number, documentId: string): Promise<any> {
    return this.http.delete<any>(`${environment.url}vendors/${vendorId}/document/${documentId}`).toPromise();
  }

  restoreDocument(documentId: string): Promise<any> {
    return this.http.post<any>(`${environment.url}vendors/documents/${documentId}/restore`, {}).toPromise();
  }

  documentTrash(documentId: string): Promise<any> {
    return this.http.post<any>(`${environment.url}vendors/documents/${documentId}/trash`, {}).toPromise();
  }

  consultantDocumentTrash(consultantDocumentId: string): Promise<any> {
    return this.http.post<any>(`${environment.url}consultants/documents/${consultantDocumentId}/trash`, {}).toPromise();
  }

  consultantDocumentRestore(consultantDocumentId: string): Promise<any> {
    return this.http.post<any>(`${environment.url}consultants/documents/${consultantDocumentId}/restore`, {}).toPromise();
  }

  deleteSkill(vendorId: string, skillId: number): Promise<any> {
    return this.http.delete(`${environment.url}vendors/${vendorId}/skill/${skillId}`).toPromise();
  }

  uploadCompanyLogo(data: FormData, orgId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}organisation/${orgId}/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  createRequestForCV(userContactId: number, jobId: number, consultantId: number, jobDescription?: string, numberOfOpening?: number, duration?: number, workTimeZone?: string,): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/contact/${userContactId}/consultant/mylist`, {
      jobId: jobId,
      consultantId: consultantId,
      jobDescription: jobDescription,
      duration: duration,
      numberOfOpenings: numberOfOpening,
      workTimeZone: workTimeZone,
    });
  }

  uploadAdminPicture(data: FormData, orgId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}user/picture/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadUserProfilePicture(data: FormData, customerContactId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/contact/${customerContactId}/logo/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }


  deleteCompanyLogo(orgId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}organisation/${orgId}/logo`).toPromise();
  }

  deleteVendorPicture(): Promise<any> {
    return this.http.delete<any>(`${environment.url}user/picture`).toPromise();
  }

  deleteUserPicture(customerContactId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}customer/contact/${customerContactId}/logo`).toPromise();
  }

  uploadNotes(payload: FormData, vendorId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}vendor/${vendorId}/notes`, payload, this.httpOptions).toPromise()
  }

  getAuditHistory(targetId: string, targetType: any, pageNumber: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}audit-history`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
        .set('targetEntityId', targetId)
        .set('targetEntityType', targetType)
    }).toPromise();
  }

  getAuditHostory(payload: any, pageNumber: number, size: number): Promise<any> {
    return this.http.post(`${environment.url}audit-history`, payload, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    }).toPromise();
  }

  downloadExcel(payload: any): Observable<Blob> {
    return this.http.put(`${environment.url}audit-history/export`, payload, {responseType: 'blob'});
  }

  getVendorNotes(vendorId: string, pageNumber: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}vendor/${vendorId}/notes`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    }).toPromise();
  }

  checkResetPasswordToken(token: string): Promise<any> {
    return this.http.get<any>(`${environment.url}auth/rest-password`, {
      params: new HttpParams()
        .set('token', token)
    }).toPromise();
  }

  resetPassword(token: string, password: string, username: string): Promise<any> {
    return this.http.put<any>(`${environment.url}auth/reset-password`, {username, password, token}).toPromise();
  }

  sendResetMail(username: string): Promise<any> {
    return this.http.post<any>(`${environment.url}auth/reset-password-token`, {username}).toPromise();
  }

  deleteVendorNotes(vendorId: string, noteId: number): Promise<any> {
    return this.http.delete(`${environment.url}vendor/${vendorId}/note/${noteId}`).toPromise();
  }

  deleteConsultantNotes(vendorId: string, noteId: number, consultantId: number): Promise<any> {
    return this.http.delete(`${environment.url}consultants/${consultantId}/note/${noteId}`).toPromise();
  }

  deleteCustomerNotes(vendorId: string, noteId: number, customerId: number): Promise<any> {
    return this.http.delete(`${environment.url}customers/${customerId}/note/${noteId}`).toPromise();
  }

  vendorActive(vendorId: number, data: boolean): Promise<any> {
    return this.http.post<any>(`${environment.url}vendors/${vendorId}/status`, data).toPromise();
  }

  vendorInactive(vendorId: number): Promise<any> {
    return this.http.delete(`${environment.url}vendors/${vendorId}/status`).toPromise();
  }

  getMembers(pageNumber: number, role: string[], active: boolean): Promise<any> {
    return this.http.post<any>(`${environment.url}members/all`, {
      "roles": role,
      "active": active
    }, {
      params: new HttpParams()
        .set('page', pageNumber)
    }).toPromise();
  }

  addMember(data: FormData): Promise<any> {
    return this.http.post<any>(`${environment.url}members`, data, this.httpOptions).toPromise();
  }

  getMemberById(id: number): Promise<any> {
    return this.http.get<any>(`${environment.url}members/${id}`).toPromise();
  }

  updateMember(data: FormData, id: number): Promise<any> {
    return this.http.put<any>(`${environment.url}members/${id}`, data, this.httpOptions).toPromise()
  }

  InactiveMember(userId: any): Promise<any> {
    return this.http.put(`${environment.url}users/${userId}/org-user/in-active`, this.httpOptions).toPromise()
  }

  activeMember(userId: any): Promise<any> {
    return this.http.put(`${environment.url}users/${userId}/org-user/active`, this.httpOptions).toPromise()
  }

  getVendorContacts(vendorId: number, pageNumber: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}vendor/${vendorId}/contacts`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    }).toPromise();
  }

  getConsultantVendorContacts(vendorId: number): Promise<any> {
    return this.http.get<any>(`${environment.url}vendor/${vendorId}/consultant/contacts`).toPromise();
  }

  addVendorContact(Payload: any, vendorId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}vendor/${vendorId}/contact`, Payload, this.httpOptions).toPromise()
  }

  addVendorSocial(Payload: any, vendorId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}vendor/${vendorId}/link`, Payload, this.httpOptions).toPromise()
  }

  deleteVendorContact(vendorId: "" | number, contactId: number): Promise<any> {
    return this.http.delete<any>(`${environment.url}vendor/${vendorId}/contact/${contactId}`).toPromise()
  }

  changePassword(data: FormData): Promise<any> {
    return this.http.post<any>(`${environment.url}user/change-password`, data, this.httpOptions).toPromise()
  }

  createPartner(Payload: any): Promise<any> {
    return this.http.post<any>(`${environment.url}business/register`, Payload, this.httpOptions).toPromise()
  }

  getAllFiles(): Promise<any> {
    return this.http.get<any>(`${environment.url}document-type`, this.httpOptions).toPromise()
  }

  getAllFilesPaginated(page: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}document-types`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).toPromise()
  }


  getTask(taskUniqueId: string): Promise<any> {
    return this.http.get<any>(`${environment.url}admin/mytask/${taskUniqueId}`, this.httpOptions).toPromise()
  }

  uploadSettingFile(data: FormData): Observable<any> {
    return this.http.post<any>(`${environment.url}settings/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteDocumentType(id: string): Promise<any> {
    return this.http.delete(`${environment.url}document-type/${id}`).toPromise()
  }

  updateDocumentType(id: string, payload: any): Promise<any> {
    return this.http.put(`${environment.url}document-type/${id}`, payload).toPromise()
  }

  getDesignation(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}designation`)).toPromise()
  }

  getDesignationPaginated(page: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}designations`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).toPromise()
  }

  updateDesignationType(id: string, payload: any): Promise<any> {
    return this.http.put(`${environment.url}designation-type/${id}`, payload).toPromise()
  }

  addOrgSkills(payload: any): Promise<any> {
    return this.http.post(`${environment.url}skills`, payload).toPromise()
  }

  addEmployeeRange(payload: any): Observable<any> {
    return this.http.post(`${environment.url}employee-count`, payload)
  }

  onTaskStatusChange(uniqueId: number, status: String): Promise<any> {
    return this.http.post(`${environment.url}admin/my-task/${uniqueId}/change-status`, {
      status: status
    }).toPromise()
  }

  uploadOrgSkills(payload: any): Observable<any> {
    return this.http.post(`${environment.url}skills/upload`, payload, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getNoOfEmployees(): Observable<string[]> {
    return this.http.get<string[]>((`${environment.url}employee-count`))
  };

  getSkills(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}skills-type`)).toPromise()
  }

  getSkillsConsumer(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}consumer/skills-type`)).toPromise()
  }

  getIndustryVerticals(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}industry`)).toPromise()
  }

    getInformationTag(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}information-tags`)).toPromise()
  }


    getAllSkills(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}admin/skills-type`)).toPromise()
  }

  getAllSkillsPaginated(page: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}admin/skills`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).toPromise()
  }

  updateSkillType(id: string, payload: any): Promise<any> {
    return this.http.put(`${environment.url}skills/${id}`, payload).toPromise()
  }

  deleteOrgSkill(id: string): Promise<any> {
    return this.http.delete(`${environment.url}skills/${id}`).toPromise();
  }

  getExpiringDocuments(page: number, size: number,): Promise<any> {
    return this.http.get(`${environment.url}documents/expiring`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)

    }).toPromise();
  }

  getVerticals(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}verticals`)).toPromise()
  }

  getVerticalsPaginated(page: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}vertical`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).toPromise()
  }

  uploadOrgVerticals(payload: any): Observable<any> {
    return this.http.post(`${environment.url}vertical/upload`, payload, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateVerticalStatus(id: string): Observable<any> {
    return this.http.post(`${environment.url}vertical/${id}/status`, {}, this.httpOptions)
  }

  updateVertical(id: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}vertical/${id}`, payload, this.httpOptions)
  }

  addEducation(payload: any): Observable<any> {
    return this.http.post(`${environment.url}education`, payload, this.httpOptions)
  }

  getEducation(): Promise<DocType[]> {
    return this.http.get<DocType[]>((`${environment.url}education`)).toPromise()
  }

  getEducationPaginated(page: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}qualification`, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).toPromise()
  }

  uploadOrgEducation(payload: any): Observable<any> {
    return this.http.post(`${environment.url}education/upload`, payload, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateEducationStatus(id: string): Observable<any> {
    return this.http.post(`${environment.url}education/${id}/status`, {}, this.httpOptions)
  }

  updateEducation(id: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}education/${id}`, payload, this.httpOptions)
  }

  getDashboard(): Promise<any> {
    return this.http.get(`${environment.url}vendors/dashboard`, this.httpOptions).toPromise();
  }

  getSkillChart(): Promise<any> {
    return this.http.get(`${environment.url}skill-chart-api`, this.httpOptions).toPromise();
  }

  addOrgDocType(payload: any): Promise<any> {
    return this.http.post(`${environment.url}v2/document-type`, payload).toPromise();
  }

  addOrgDesType(payload: any): Promise<any> {
    return this.http.post(`${environment.url}designation`, payload).toPromise();
  }

  addOrgVertical(payload: any): Promise<any> {
    return this.http.post(`${environment.url}vertical`, payload).toPromise();
  }

  updateContact(payload: any, vendorId: string, contactId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}vendor/${vendorId}/contact/${contactId}`, payload, this.httpOptions).toPromise();
  }

  updateSocialLink(payload: any, vendorId: string, linkId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}vendor/${vendorId}/link/${linkId}`, payload, this.httpOptions).toPromise();
  }

  updateVendorNotes(payload: any, vendorId: string, noteId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}vendor/${vendorId}/notes/${noteId}`, payload, this.httpOptions).toPromise();
  }

  getJobs(page: number, size: number, search: any, showArchived: boolean, jobId?: string,
          jobTitle?: string, clientName?: string, from?: string, to?: string, experience?: {
      min: number;
      max: number;
    }[], createdBy?: string): Observable<any> {
    return this.http.post<any>(`${environment.url}admin/jobs/search`, {
      "query": search,
      "showArchived": showArchived,
      jobId: jobId,
      jobTitle: jobTitle,
      clientName: clientName,
      from: from,
      to: to,
      experience: experience,
      createdBy: createdBy,
    }, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }

  getActiveCustomerClients(): Observable<any> {
    return this.http.post<any>(`${environment.url}filters/customers`, this.httpOptions);
  }

  getAllCustomerJobs(page: number, contactId: string | null, search: any, showArchived: boolean, size: number,
                     jobId?: string, jobTitle?: string, status?: string, from?: string, to?: string, skillIds?: number[],
                     experience?: { min: number; max: number; }[]): Observable<any> {
    return this.http.post<any>(`${environment.url}customer-contact/${contactId}/jobs/search`, {
      "query": search,
      "showArchived": showArchived,
      jobId: jobId,
      jobTitle: jobTitle,
      status: status,
      from: from,
      to: to,
      skillIds: skillIds,
      experience: experience,
    }, {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }

  getJobDetail(jobId: any): Observable<any> {
    return this.http.get(`${environment.url}jobs/${jobId}`, this.httpOptions);
  }

  getContactsByCustomerId(customerId: number): Promise<any> {
    return this.http.get(`${environment.url}customer/${customerId}/contact/drop-down`, this.httpOptions).toPromise();
  }

  getMyList(page: number, contactId: number, size: number, payload: myListPayload): Promise<any> {
    return this.http.post(`${environment.url}customer/contact/${contactId}/consultant/mylist/search`, payload, {
      params: new HttpParams()
        .set('contactId', contactId)
        .set('page', page)
        .set('size', size)
    }).toPromise();
  }

  addJob(payload: any, contactId: string): Observable<any> {
    return this.http.post(`${environment.url}customer-contact/${contactId}/jobs`, payload, this.httpOptions);
  }

  addAdminJob(payload: any): Observable<any> {
    return this.http.post(`${environment.url}admin/job`, payload, this.httpOptions);
  }

  updateJob(payload: any, jobId: any): Promise<any> {
    return this.http.put(`${environment.url}jobs/${jobId}`, payload).toPromise();
  }

  updateAdminJob(payload: any, jobId: any): Promise<any> {
    return this.http.put(`${environment.url}admin/job/${jobId}`, payload).toPromise();
  }

  deleteJob(jobId: any): Promise<any> {
    return this.http.delete(`${environment.url}jobs/${jobId}`).toPromise();
  }

  copyToClipboard(id: number): Promise<any> {
    return this.http.get(`${environment.url}jobs/${id}/copy-to-clipboard`, {responseType: "text"}).toPromise();
  }

  inactiveDocumentType(id: string): Observable<any> {
    return this.http.post(`${environment.url}document-type/${id}/trash`, {}, this.httpOptions)
  }

  activeDocumentType(id: string): Observable<any> {
    return this.http.post(`${environment.url}document-type/${id}/restore`, {}, this.httpOptions)
  }

  inactiveDesignationType(id: string): Observable<any> {
    return this.http.post(`${environment.url}designation-type/${id}/trash`, {}, this.httpOptions)
  }

  activeDesignationType(id: string): Observable<any> {
    return this.http.post(`${environment.url}designation-type/${id}/restore`, {}, this.httpOptions)
  }

  inactiveSkillType(id: string): Observable<any> {
    return this.http.post(`${environment.url}skills-type/${id}/trash`, {}, this.httpOptions)
  }

  activeSkillType(id: string): Observable<any> {
    return this.http.post(`${environment.url}skills-type/${id}/restore`, {}, this.httpOptions)
  }

  getAllThemes(): Observable<any> {
    return this.http.get(`${environment.url}theme`, this.httpOptions);
  }

  getWorkTimeZone(): Observable<any> {
    return this.http.get(`${environment.url}time-zones`, this.httpOptions);
  }

  updateOrgTheme(themeId: number, themeName: string, colorCode: string): Observable<any> {
    return this.http.post(`${environment.url}user/theme`, {id: themeId, name: themeName, colour: colorCode});
  }

  updateOrgCustomTheme(colorCode: string): Observable<any> {
    return this.http.post(`${environment.url}custom-theme`, {name: 'customTheme', colour: colorCode});
  }

  deleteCustomTheme(themeId: string): Observable<any> {
    return this.http.delete(`${environment.url}custom-theme/${themeId}`);
  }

  downloadConsultantsReport(query: string,
                            showArchived: boolean, showActive: boolean, experience?: { min: number; max: number; }[],
                            dateSearchCriteria?: { filterType: string, from: string, to: string }, skills?: number[],
                            jobTypes?: string[], statuses?: string[], vendorName?: string, consultantName?: string,
                            title?: string, consultantId?: string): Observable<any> {
    return this.http.post(
      `${environment.url}consultants/download/report`,
      {
        consultantName: consultantName,
        title: title,
        consultantId: consultantId,
        query: query,
        vendorName: vendorName,
        skills: skills,
        experience: experience,
        jobTypes: jobTypes,
        statuses: statuses,
        searchEnable: showArchived,
        active: showActive,
        dateSearchCriteria: dateSearchCriteria,
      },
      {responseType: 'blob' as 'json'}
    );
  }

  getAllConsultants(pageNumber: number, size: number,payload:any): Observable<any> {
    return this.http.post(
      `${environment.url}admin/consultant/search`, payload,
      {params: new HttpParams().set('page', pageNumber.toString()).set('size', size.toString())}
    );
  }

  getWebCandidate(page: number, size: number, sort: string[], payload: any): Observable<any> {
    return this.http.post(
      `${environment.url}job-candidates/search`, payload, {
        params: new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('sort', sort.join(','))
      }
    );
  }
  getWebCustomer(page: number, size: number, sort: string[], payload: any): Observable<any> {
    return this.http.post(
      `${environment.url}web-client/search`, payload, {
        params: new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('sort', sort.join(','))
      }
    );
  }

    getAllFeaturedConsultants(page: number, size: number, sort: string, query: string, experience?: { min: number; max: number; }[],
                              skills?: number[], title?: string, consultantId?: string): Observable<any> {
        return this.http.post(
            `${environment.url}consultant/featured`,
            {
               title: title,
                consultantId: consultantId,
                query: query,
                skills: skills,
                experience: experience,
            },
            {
                params: new HttpParams()
                    .set('page', page.toString())
                    .set('size', size.toString())
                    .set('sort', sort)
            }
        );
    }

  addNewConsultant(payload: any): Observable<any> {
    return this.http.post(`${environment.url}consultant`, payload, this.httpOptions);
  }

  getConsultant(candidateId: string): Observable<any> {
    return this.http.get(`${environment.url}consultant/${candidateId}`, this.httpOptions);
  }
  getConsultantClientLogin(candidateId: string): Observable<any> {
    return this.http.get(`${environment.url}consumer/consultant/${candidateId}`, this.httpOptions);
  }
  updateConsultant(candidateId: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}consultant/${candidateId}`, payload, this.httpOptions);
  }

  updatePreferredLocation(consultantId: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}consultant/${consultantId}/preferred-location`, payload, this.httpOptions);
  }

  updateSummary(consultantId: string, payload: any): Observable<any> {
    return this.http.put(`${environment.url}consultants/${consultantId}/summary`, payload, this.httpOptions);
  }

  getEducationListForConsultants(): Observable<Education[]> {
    return this.http.get<Education[]>(`${environment.url}education`, this.httpOptions)
  }

  getPassingYearListForConsultants(): Observable<any> {
    return this.http.get(`${environment.url}consultant/passing-year`, this.httpOptions)
  }

  //documents API for consultants

  uploadConsultantDocument(data: FormData, consultantId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/documents/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getConsultantResume(consultantId: number): Observable<any> {
    return this.http.get(`${environment.url}consultant/${consultantId}/resume`, this.httpOptions);
  }

  uploadConsultantResume(data: FormData, consultantId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/resume/upload`, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getConsultantVideo(consultantId: number): Observable<any> {
    return this.http.get(`${environment.url}consultant/${consultantId}/video`, this.httpOptions);
  }

  addConsultantVideo(consultantId: string, videoUrl: string): Observable<any> {
    return this.http.post<any>(
      `${environment.url}consultant/${consultantId}/video`, videoUrl, this.httpOptions
    );
  }

  deleteConsultantVideo(consultantId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.url}consultant/${consultantId}/video`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getConsultantDocuments(consultantId: number, pageNumber: number, size: number, archived: boolean): Observable<any> {
    return this.http.get<any>(`${environment.url}consultant/${consultantId}/documents`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
        .set('archived', archived),
    });
  }

  addConsultantSearchFlag(consultantId: number,): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/search-enable`, this.httpOptions);
  }

  removeConsultantSearchFlag(consultantId: number,): Observable<any> {
    return this.http.delete<any>(`${environment.url}consultant/${consultantId}/search-enable`, this.httpOptions);
  }

  addInterested(contactId: number, consultantId: number): Observable<any> {
    return this.http.post(
      `${environment.url}customer/contact/${contactId}/consultant/${consultantId}/favourite`,
      {},
      {
        ...this.httpOptions,
        responseType: 'text' as 'json'
      }
    );
  }

  removeInterested(contactId: number, consultantId: number): Observable<any> {
    return this.http.delete(
      `${environment.url}customer/contact/${contactId}/consultant/${consultantId}/favourite`,
      {
        ...this.httpOptions,
        responseType: 'text' as 'json'
      }
    );
  }

  consultantStatus(consultantId: number, status: string): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant/${consultantId}/status`, {}, {
      params: new HttpParams()
        .set('status', status)
    });
  }

  getVendorForConsultant = () => {
    return this.http.get<any>(`${environment.url}vendors`, this.httpOptions).toPromise();
  }

  createCustomerContact(payload: any, customerId: string): Observable<any> {
    return this.http.post(`${environment.url}customer/${customerId}/contact`, payload, this.httpOptions);
  }

  // getCustomerContacts(customerId: number): Promise<any> {
  //   return this.http.get<any>(`${environment.url}customer/${customerId}/contact`).toPromise();
  // }

  getCustomerContacts(customerId: number, pageNumber: number, size: number, archived: boolean): Observable<any> {
    return this.http.get<any>(`${environment.url}customer/${customerId}/contact`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
        .set('showArchived', archived),
    });
  }

  sendEmail(contactId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/contact/${contactId}/send-email`, '', this.httpOptions)
  }

  updateCustomerContact(payload: any, contactId: number): Observable<any> {
    return this.http.put<any>(`${environment.url}customer/contact/${contactId}`, payload, this.httpOptions)
  }

  enableCustomerContact(contactId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/contact/${contactId}/restore`, {}, this.httpOptions)
  }

  disableCustomerContact(contactId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/contact/${contactId}/trash`, {}, this.httpOptions)
  }

  updateCustomerStatus(customerId: number): Observable<any> {
    return this.http.put<any>(`${environment.url}customers/${customerId}/status`, {}, this.httpOptions)
  }

  getConsultantJobs(page: number, search: any) {
    return this.http.post<any>(`${environment.url}consultant-jobs/search`, {
      "query": search,
    }, {
      params: new HttpParams()
        .set('page', page)
        .set('size', 10)
    });
  }

  uploadConsultantProfilePicture(data: FormData, consultantId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/picture`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getCustomerById(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${environment.url}customers/${id}`);
  }

  getSpocList(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.url}organisation/members`);
  }

  getVerticalListForCustomerContacts(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.url}verticals`, this.httpOptions);
  }

  updateConsultantPrimarySkill(consultantId: any, skillId: any): Observable<Consultant> {
    return this.http.post<Consultant>(`${environment.url}consultant/${consultantId}/primary-skills`, {skills: skillId}, this.httpOptions);
  }

  clearMyListHistory(startdate: string, finishdate: string): Observable<Consultant> {
    return this.http.post<Consultant>(`${environment.url}customer/contact/consultant/clear-history/my-list`,
      {
        startDate: startdate,
        finishDate: finishdate
      },
      this.httpOptions);
  }

  updateConsultantSecondarySkill(consultantId: any, skillId: any): Observable<Consultant> {
    return this.http.post<Consultant>(`${environment.url}consultant/${consultantId}/secondary-skills`, {skills: skillId}, this.httpOptions);
  }

  updateConsultantRating(consultantId: any, communicationRating: any): Observable<Consultant> {
    return this.http.put<Consultant>(`${environment.url}consultants/${consultantId}/communication-rating`, {communicationRating: communicationRating}, this.httpOptions);
  }

  availabilityToJoin(consultantId: any, availabilityToJoin: any): Observable<Consultant> {
    return this.http.post<Consultant>(`${environment.url}consultants/${consultantId}/availability`, {availabilityToJoin: availabilityToJoin}, this.httpOptions);
  }

  deleteConsultantPrimarySkill(consultantId: string, skillId: number): Observable<any> {
    return this.http.delete(`${environment.url}consultant/${consultantId}/primary-skill/${skillId}`, this.httpOptions)
  }

  deleteConsultantSecondarySkill(consultantId: string, skillId: number): Observable<any> {
    return this.http.delete(`${environment.url}consultant/${consultantId}/secondary-skill/${skillId}`, this.httpOptions)
  }

  getConsultantNotes(consultantId: string, pageNumber: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}consultant/${consultantId}/notes`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    }).toPromise();
  }

  uploadConsultantNotes(payload: FormData, consultantId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/notes`, payload, this.httpOptions).toPromise()
  }

  updateConsultantNotes(payload: any, consultantId: string, noteId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}consultant/${consultantId}/notes/${noteId}`, payload, this.httpOptions).toPromise();
  }

  hideConsultantProfilePicture(consultantId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/picture/private`, {}, this.httpOptions)
  }

  hideConsultantResume(consultantId: number): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant/${consultantId}/resume-status/disable`, this.httpOptions)
  }

  displayConsultantProfilePicture(consultantId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/picture/public`, {}, this.httpOptions)
  }

  displayConsultantResume(consultantId: number): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant/${consultantId}/resume-status/enable`, this.httpOptions)
  }

  toggleConsultantVideo(consultantId: number, toggleType: VideoToggleType): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant/${consultantId}/video-status/${toggleType}`, this.httpOptions)
  }

  switchConsultantStatus(consultantId: number): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant/${consultantId}/active`, {}, this.httpOptions)
  }

  removeProfilePicture(consultantId: number): Observable<any> {
    return this.http.delete(`${environment.url}consultant/${consultantId}/picture`, this.httpOptions)
  }

  jobActive(jobId: number): Observable<any> {
    return this.http.post<any>(`${environment.url}jobs/${jobId}/active`, {}, this.httpOptions)
  }

  jobInActive(jobId: number): Observable<any> {
    return this.http.delete(`${environment.url}jobs/${jobId}/active`, this.httpOptions)
  }

  getCustomerNotes(customerId: string, pageNumber: number, size: number): Promise<any> {
    return this.http.get<any>(`${environment.url}customer/${customerId}/notes`, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    }).toPromise();
  }

  uploadCustomerNotes(payload: FormData, customerId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}customer/${customerId}/notes`, payload, this.httpOptions).toPromise()
  }

  updateCustomerNotes(payload: any, customerId: string, noteId: string): Promise<VendorCorp> {
    return this.http.put<VendorCorp>(`${environment.url}customer/${customerId}/notes/${noteId}`, payload, this.httpOptions).toPromise();
  }

  changeBulkAssignee(requestIds: number[], assigneeId: number) {
    return this.http.put<any>(`${environment.url}customers/contacts/assignee`, {
      "requestIds": requestIds,
      "assigneeId": assigneeId,
    },);
  }

  getAllAdminMyTasks(pageNumber: number, size: number, payload: SearchFilters) {
    return this.http.post<any>(`${environment.url}admin/mytask`, {...payload}, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    });
  }

  getMemebersMyTasks(pageNumber: number, size: number, payload: SearchFilters) {
    return this.http.post<any>(`${environment.url}member/mytask`, {...payload}, {
      params: new HttpParams()
        .set('page', pageNumber)
        .set('size', size)
    });
  }

  addCommentInTask(comment: string, communicationType: string, uniqueId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}task/${uniqueId}/comments`, {
      comment: comment,
      communicationType: communicationType,
    }, this.httpOptions).toPromise()
  }

  getCommentsForTasks(uniqueId: number, communicationType?: string): Observable<any> {
    return this.http.get<any>(`${environment.url}task/${uniqueId}/comments`, {
      params: new HttpParams()
        .set('communicationType', communicationType ?? ''),
    },);
  }

  onChangeMangerOfTask(uniqueId: number, assigneId: number): Promise<any> {
    return this.http.put<any>(`${environment.url}customers/contacts/${uniqueId}`, {
      assigneeId: assigneId
    }).toPromise();
  }

  uploadConsultantDeployedHistory(payload: any, consultantId: number): Promise<any> {
    return this.http.post<any>(`${environment.url}consultant/${consultantId}/contract`, payload, this.httpOptions).toPromise()
  }

  getConsultantDeployedHistory(consultantId: string, page?: number, size?: number, sort?: string[]): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    if (sort) {
      sort.forEach(s => params = params.append('sort', s));
    }
    return this.http.get(`${environment.url}consultant/${consultantId}/contract-history`, {params: params});
  }

  getAllCustomerContacts(page: number, size: number, payload: FiltersDto): Observable<any> {
    return this.http.post(`${environment.url}customer/contacts/search`, {...payload},
      {
        params: new HttpParams()
          .set('page', page)
          .set('size', size)
      });
  }
  getSolutions(page: number, size: number,payload:SolutionFiltersDto): Observable<any> {
    return this.http.post(`${environment.url}solutions/search`, {
          ...payload,
        },
        {
          params: new HttpParams()
              .set('page', page)
              .set('size', size)
        });
  }

  deleteConsultantDeployedHistory(consultantContractId: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}consultant-contract/${consultantContractId}`, this.httpOptions)
  }

  updateConsultantContract(consultantContractId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${environment.url}consultant-contract/${consultantContractId}`, payload, this.httpOptions)
  }

  getConsultantContractById(consultantContractId: number): Observable<any> {
    return this.http.get<any>(`${environment.url}consultant-contract/${consultantContractId}`, this.httpOptions)
  }

  getCustomerContactByJobId(contactJobId: number): Observable<any> {
    return this.http.get<any>(`${environment.url}customer/mylist/${contactJobId}`)
  }

  deleteCommentForAdminClient(commentId: number): Observable<any> {
    return this.http.delete(`${environment.url}comments/${commentId}/remove`)
  }

  editCommentForAdminClient(commentId: number, payload: any): Observable<any> {
    return this.http.put(`${environment.url}comments/${commentId}`, payload, this.httpOptions)
  }

  getSingleComment(commentId: number): Observable<any> {
    return this.http.get(`${environment.url}comments/${commentId}`)
  }

  getAllCustomersAnalytics(page: number, size: number, sort: string[], payload: CustomerAnalyticsSearch): Observable<any> {
    const sortString = sort.join(',');
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sortString);
    return this.http.post(`${environment.url}admin/customer/analytics/search`, payload, {params});
  }

  getAllMemberAnalytics(page: number, size: number, sort: string[],payload: MemberAnalyticsSearch): Observable<any> {
    return this.http.post(`${environment.url}admin/members/analytics`,payload)
  }

  downloadCostumerReport(customerName?: string, customerContact?: string, assignedSpoc?: string, deviceUsed?: string,
                         location?: string, loginTime?: string, logoutTime?: string): Observable<any> {
    return this.http.post(
      `${environment.url}admin/customer-analytics/download/report`,
      {
        customerName: customerName,
        customerContact: customerContact,
        assignedSpoc: assignedSpoc,
        deviceUsed: deviceUsed,
        location: location,
        loginTime: loginTime,
        logoutTime: logoutTime
      },
      {responseType: 'blob' as 'json'}
    );
  }

  downloadMemberReport(memberName?: string,deviceUsed?: string, location?: string, loginTime?: string, logoutTime?: string): Observable<any> {
    return this.http.post(
      `${environment.url}admin/members-analytics/download/report`,
      {
        memberName: memberName,
        deviceUsed: deviceUsed,
        location: location,
        loginTime: loginTime,
        logoutTime: logoutTime
      },
      {responseType: 'blob' as 'json'}
    );
  }

  getEmployeeCount(): Observable<any> {
    return this.http.get(`${environment.url}employee-count`)
  }

  createEmployeeRange(payload: EmployeeRange): Observable<any> {
    return this.http.post(`${environment.url}employee-count`, payload, this.httpOptions)
  }

  clientLogout(): Promise<any> {
    return this.http.post(`${environment.url}users/logout`, null).toPromise();
  }

  adminLogout() {
    return this.http.post(`${environment.url}members/logout`, null);
  }

  getAllReportsOfCustomerAnalytics(customerContactId: number, sessionId: string): Observable<any> {
    const params = new HttpParams()
      .set('customerContactId', customerContactId.toString())
      .set('sessionId', sessionId);
    return this.http.get(`${environment.url}admin/customer-analytic/reports`, {params});
  }

  markTaskAsRead(taskId: number) {
    return this.http.patch(`${environment.url}admin/my-task/${taskId}/mark-as-read`, {})
  }

  markTaskAsUnRead(taskIds: number[]) {
    return this.http.patch(`${environment.url}admin/my-task/mark-as-un-read`, {taskIds})
  }

  getAllUnreadTasks(): Observable<any> {
    return this.http.get(`${environment.url}admin/my-task/unread`)
  }

  customerContactChangeAssignee(customerContactId: number[], spocId: number): Observable<any> {
    return this.http.put(`${environment.url}customers/contacts/spoc`, {
      customerContactId: customerContactId,
      spocId: spocId
    })
  }

  consultantExperience(): Observable<any> {
    return this.http.get(`${environment.url}consultants/experience`)
  }

  consultantSkills(): Observable<any> {
    return this.http.get(`${environment.url}consultants/skills`)
  }
  skillsCount(): Observable<any> {
    return this.http.get(`${environment.url}skilled-consultants`)
  }

  consultantChart(): Observable<any> {
    return this.http.get(`${environment.url}consultant/dashboard`)
  }

  customertChart(): Observable<any> {
    return this.http.get(`${environment.url}customers/dashboard`)
  }

  tasksChart(): Observable<any> {
    return this.http.get(`${environment.url}my-task/dashboard`)
  }

  getAllSolutionsForAdmin(page: number, size: number, sort: string[], payload?:any): Observable<any> {
    const newpayload = {
      ...payload,
      demoReady:payload?.demoReady?.[0] === 'Yes' ? true : payload?.demoReady?.[0] === 'No' ?  false : undefined
    }
    const sortString = sort.join(',');
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sortString);
    return this.http.post(`${environment.url}admin/solutions/search`,newpayload, {params})
  }

  getIndustryVertical(): Observable<any> {
    return this.http.get(`${environment.url}admin/industry`)
  }

  createSolutionInfomation(payload: CreateSolution): Observable<any> {
    return this.http.post(`${environment.url}admin/solutions/info`, {...payload})
  }

  getSolutionById(solutionId: number): Observable<any> {
    return this.http.get(`${environment.url}admin/solutions/${solutionId}`)
  }
  getClientSolutionById(solutionId:number):Observable<any> {
    return this.http.get(`${environment.url}solutions/${solutionId}`)
  }
  getClientSolutionAttachments(solutionId:number):Observable<any> {
    return this.http.get(`${environment.url}solutions/${solutionId}/documents`)
  }


  updateSolutionById(solutionId: number, payload: CreateSolution): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/${solutionId}/info`, {...payload})
  }
  sendRequestDetailPage(solutionId:number,payload:any):Observable<any> {
    return this.http.post(`${environment.url}solutions/${solutionId}/request`,{...payload})
  }

  createSolutionTechnology(solutionId: number, payload: CreateSolutionTechnology): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/${solutionId}/technology`, {...payload})
  }

  addIndustryVertical(payload: any): Observable<any> {
    return this.http.post(`${environment.url}admin/industry`, payload)
  }

  getInformationTags(): Observable<any> {
    return this.http.get(`${environment.url}information-tags`)
  }

  createInformationTags(payload: any): Observable<any> {
    return this.http.post(`${environment.url}admin/information-tags`, payload)
  }

  uploadLogoForSolution(solutionId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.url}admin/solutions/${solutionId}/logo`, formData);
  }

  markSolutionAsActive(solutionId: number): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/${solutionId}/active`, {})
  }

  markSolutionAsInActive(solutionId: number): Observable<any> {
    return this.http.delete(`${environment.url}admin/solutions/${solutionId}/active`)
  }

  publishDocumentForSolution(solutionId: number): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/documents/${solutionId}/publish`, {});
  }

  retractDocumentForSolution(solutionId: number): Observable<any> {
    return this.http.delete(`${environment.url}admin/solutions/documents/${solutionId}/retract`, {});
  }

  postNotesForSolutions(solutionId: number, payload: any): Observable<any> {
    return this.http.post(`${environment.url}admin/solutions/${solutionId}/notes`, payload)
  }

  updateNotesForSolutions(solutionId: number, noteId: number, payload: any): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/${solutionId}/notes/${noteId}`, payload)
  }

  deleteNotesForSolutions(solutionId: number, noteId: number): Observable<any> {
    return this.http.delete(`${environment.url}admin/solutions/${solutionId}/notes/${noteId}`)
  }

  getAllNotesForSolutions(solutionId: number, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get(`${environment.url}admin/solutions/${solutionId}/notes`, {params})
  }

  enableSearchForSolution(solutionId: number): Observable<any> {
    return this.http.put(`${environment.url}admin/solutions/${solutionId}/enable-search`, {})
  }

  disableSearchForSolution(solutionId: number): Observable<any> {
    return this.http.delete(`${environment.url}admin/solutions/${solutionId}/disable-search`)
  }

  uploadDocumentForSolution(solutionsId: number, typeId: number, docName: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${environment.url}admin/solutions/${solutionsId}/documents/upload/label`;
    return this.http.post(url, formData, {params: {typeId: typeId, docName: docName}});
  }

  uploadDocumentUrlForSolution(solutionId: number, payload: any): Observable<any> {
    return this.http.post(`${environment.url}admin/solutions/${solutionId}/documents/upload/url`, payload);
  }


  getAllDocumentsForSolutions(solutionId: number, page: number, size: number, showEnabled: boolean) {
    return this.http.get<PageableResponse<solutionAttachment>>(`${environment.url}admin/solutions/${solutionId}/documents`, {
      params: {
        page: page.toString(), size: size.toString(), showEnabled: showEnabled.toString()
      }
    });
  }

  deleteLogoForSolution(solutionId:number) {
    return this.http.delete(`${environment.url}admin/solutions/${solutionId}/logo/remove`)
  }

  featureConsultant(consultantId:number):Observable<any> {
    return this.http.put(`${environment.url}consultant/${consultantId}/featured`,{})
  }

  unFeatureConsultant(consultantId:number):Observable<any> {
    return this.http.delete(`${environment.url}consultant/${consultantId}/featured`)
  }

  archiveSolutionDocument(documentId:number):Observable<any> {
    return this.http.delete(`${environment.url}admin/solutions/documents/${documentId}/archive`)
  }

  registerNow(data: FormData): Observable<any> {
    return this.http.post<any>(`${environment.url}customer/register`, data, {});
  }

  getSingleJobCandidate(jobCandidateId:number): Observable<any> {
    return this.http.get<any>(`${environment.url}job-candidates/${jobCandidateId}`)
  }

  updateSingleJobCandidate(jobCandidateId:number,payload:any): Observable<any> {
    return this.http.put<any>(`${environment.url}job-candidates/${jobCandidateId}`,payload)
  }

  updateCandidateSkills(jobCandidateId:number,payload:{skills:number[]}){
    return this.http.put(`${environment.url}job-candidates/${jobCandidateId}/skills`,payload)
  }

  getAllDocumentOfWebCandidate(webCandidateId:number,page:number,size:number,active:boolean) {
    return this.http.get(`${environment.url}web-candidate/${webCandidateId}/documents`,{
      params:{
        page:page,
        size:size,
        active:active
      }
    })
  }

  addWebCandidateUrlDocument(webCandidateId:number,payload:any) {
    return this.http.post(`${environment.url}web-candidate/${webCandidateId}/document/url`,payload)
  }

  addWebCandidateFileDocument(webCandidateId: number, typeId: number, docName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('typeId', typeId.toString());
    formData.append('docName', docName);
    return this.http.post(`${environment.url}web-candidate/${webCandidateId}/document/label`, formData);
  }

  addWebCandidateNotes(webCandidateId:number,payload:{description:string}) {
    return this.http.post(`${environment.url}web-candidate/${webCandidateId}/communication`, payload);
  }

  updateWebCandidateNotes(webCandidateId:number,communicationId:number,payload:{description:string}) {
    return this.http.put(`${environment.url}web-candidate/${webCandidateId}/communication/${communicationId}`, payload);
  }

  deleteWebCandidateNotes(webCandidateId:number,communicationId:number) {
    return this.http.delete(`${environment.url}web-candidate/${webCandidateId}/communication/${communicationId}`);
  }

  getAllWebCandidateNotes(webCandidateId:number) {
    return this.http.get(`${environment.url}web-candidate/${webCandidateId}/communication`);
  }

  deleteWebCandidateDocument(webCandidateId:number,documentId:number){
    return this.http.delete(`${environment.url}web-candidate/${webCandidateId}/documents/${documentId}`)
  }

  inactiveWebCandidateDocument(webCandidateId:number,documentId:number) {
    return this.http.delete(`${environment.url}web-candidate/${webCandidateId}/documents/${documentId}/trash`);
  }

  restoreWebCandidateDocument(webCandidateId:number,documentId:number) {
    return this.http.put(`${environment.url}web-candidate/${webCandidateId}/documents/${documentId}/restore`, {})
  }

  changeStatusOfWebCandidate(webCandidateId:number,payload:{status:string}) {
    return this.http.put(`${environment.url}web-candidate/${webCandidateId}/status`, payload)
  }

  upgradeWebCandidate(webCandidateId:number) {
    return this.http.post(`${environment.url}web-candidate/${webCandidateId}/consultant/upgrade`, {})
  }

  getWebClient(webClientId:number) {
    return this.http.get(`${environment.url}web-client/${webClientId}`)
  }

  updateWebClient(webClientId:number,payload:any){
    return this.http.put(`${environment.url}web-client/${webClientId}`,payload)
  }

  addNoteForCustomerContact(webClientId:number,payload:any) {
    return this.http.post(`${environment.url}web-client/${webClientId}/notes`,payload)
  }

  getNotesForCustomerContact(webClientId:number) {
    return this.http.get(`${environment.url}web-client/${webClientId}/notes`);
  }

  updateNoteForWebClient(webClientId:number,notesId:number,payload:any) {
    return this.http.put(`${environment.url}web-client/${webClientId}/notes/${notesId}`,payload)
  }

  deleteNoteForWebClient(webClientId:number,notesId:number) {
    return this.http.delete(`${environment.url}web-client/${webClientId}/notes/${notesId}`)
  }

  markWebClientAsVerified(webClientId: number, verificationStatus: string) {
    const payload = { verificationStatus };
    return this.http.put(`${environment.url}web-client/${webClientId}/verification-status`, payload);
  }

  assignCustomerToWebClient(webClientId:number,payload:{spocId:number,customerId:number}) {
    return this.http.put(`${environment.url}web-client/${webClientId}/assign-customer`,payload)
  }

  deleteCandidateSkill(jobCandidateId:number,skillId:number) {
    return this.http.delete(`${environment.url}job-candidates/${jobCandidateId}/skills/${skillId}`)
  }

  reAssignCustomerContact(contactId:number,payload:{customerId:number}) {
    return this.http.put(`${environment.url}customer/contact/${contactId}/customer`,payload)
  }

  careerPosts(page: number, size: number, query: string, experienceRange: any, jobType: string[], workLocation: string[]): Observable<any> {
    const url = `${environment.url}/admin/public/jobs/search?page=${page}&size=${size}`;
    const payload = {
      query: query,
      experience: experienceRange,
      jobType: jobType,
      workLocation: workLocation,
    };
    return this.http.post<any>(url, payload);
  }

  careerPost(id:number): Observable<any> {
    const url = `${environment.url}job/${id}`;
    return this.http.get<any>(url);
  }

  uploadResume(file: File): Observable<any> {
    const url =`${environment.url}document`
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData)
  }
}
